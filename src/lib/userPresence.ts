import { ref, onDisconnect, set, onValue, serverTimestamp } from 'firebase/database';
import { rtdb, isFirebaseConfigured } from './firebase';

const PRESENCE_PATH = 'presence';

export function trackUserPresence(onCountChange: (count: number) => void) {
  if (!isFirebaseConfigured || !rtdb) {
    // Firebase not configured, fallback to 1
    console.warn('Firebase Realtime Database not configured, using fallback count');
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
  }).catch((error) => {
    console.error('Error setting user presence:', error);
    onCountChange(1); // Fallback to 1 on error
  });

  // Remove this user when they disconnect
  onDisconnect(userStatusRef).remove().catch((error) => {
    console.error('Error setting onDisconnect:', error);
  });

  // Count online users
  let unsubscribe: (() => void) | null = null;

  try {
    unsubscribe = onValue(presenceRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          // Count only user entries (exclude the 'count' field if it exists)
          const userCount = Object.keys(data).filter(key => key !== 'count').length;
          onCountChange(userCount > 0 ? userCount : 1);
        } else {
          onCountChange(1);
        }
      } catch (error) {
        console.error('Error processing presence data:', error);
        onCountChange(1);
      }
    }, (error) => {
      console.error('Error listening to presence:', error);
      onCountChange(1);
    });
  } catch (error) {
    console.error('Error setting up presence listener:', error);
    onCountChange(1);
  }

  // Return cleanup function
  return () => {
    if (unsubscribe) {
      unsubscribe();
    }
    set(userStatusRef, null).catch((error) => {
      console.error('Error cleaning up presence:', error);
    });
  };
}

export function getPresenceCount(): Promise<number> {
  if (!isFirebaseConfigured || !rtdb) {
    return Promise.resolve(1);
  }

  return new Promise((resolve) => {
    const presenceRef = ref(rtdb, PRESENCE_PATH);
    const unsubscribe = onValue(presenceRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const userCount = Object.keys(data).filter(key => key !== 'count').length;
          unsubscribe();
          resolve(userCount > 0 ? userCount : 1);
        } else {
          unsubscribe();
          resolve(1);
        }
      } catch (error) {
        console.error('Error getting presence count:', error);
        unsubscribe();
        resolve(1);
      }
    }, (error) => {
      console.error('Error listening for presence count:', error);
      unsubscribe();
      resolve(1);
    });
  });
}
