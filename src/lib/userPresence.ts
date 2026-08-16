import { ref, onDisconnect, set, onValue, serverTimestamp } from 'firebase/database';
import { rtdb, isFirebaseConfigured } from './firebase';

const PRESENCE_PATH = 'presence';

export function trackUserPresence(onCountChange: (count: number) => void) {
  if (!isFirebaseConfigured || !rtdb) {
    // Firebase not configured, fallback to 1
    onCountChange(1);
    return () => {};
  }

  // Generate a unique ID for this session
  const sessionId = sessionStorage.getItem('visitor_session') || 
                     Math.random().toString(36).substring(2, 15);
  sessionStorage.setItem('visitor_session', sessionId);

  // Reference to this user's presence
  const userStatusRef = ref(rtdb, `${PRESENCE_PATH}/${sessionId}`);
  // Reference to the presence list
  const presenceRef = ref(rtdb, PRESENCE_PATH);

  // Set this user as online
  set(userStatusRef, {
    online: true,
    lastSeen: serverTimestamp(),
  });

  // Remove this user when they disconnect
  onDisconnect(userStatusRef).remove();

  // Count online users
  let count = 0;

  const countUsers = () => {
    onValue(presenceRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Count only user entries (exclude the 'count' field if it exists)
        const userCount = Object.keys(data).filter(key => key !== 'count').length;
        count = userCount;
        onCountChange(count);
      } else {
        count = 0;
        onCountChange(0);
      }
    });
  };

  countUsers();

  // Return cleanup function
  return () => {
    set(userStatusRef, null);
  };
}

export function getPresenceCount(): Promise<number> {
  if (!isFirebaseConfigured || !rtdb) {
    return Promise.resolve(1);
  }

  return new Promise((resolve) => {
    const presenceRef = ref(rtdb, PRESENCE_PATH);
    const unsubscribe = onValue(presenceRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userCount = Object.keys(data).filter(key => key !== 'count').length;
        unsubscribe();
        resolve(userCount);
      } else {
        unsubscribe();
        resolve(0);
      }
    });
  });
}
