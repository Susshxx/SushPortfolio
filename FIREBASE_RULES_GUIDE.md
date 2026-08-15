# Firebase Firestore Security Rules Guide

## Current Setup

Your portfolio uses **password-based authentication** in the admin panel (password: `Sushhora`), but this is **client-side only**. Firebase needs its own security rules.

## Quick Start (Simple Setup)

### Step 1: Apply Rules in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Firestore Database** > **Rules**
4. Copy and paste one of the rule sets below
5. Click **Publish**

---

## Rule Options

### 🔷 Option 1: Public Read, Open Write (TESTING ONLY)

**Use for:** Initial testing and development

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{projectId} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **WARNING**: Anyone can modify your data! Use only for testing.

---

### ✅ Option 2: Public Read, Time-Limited Write (RECOMMENDED)

**Use for:** Simple portfolio without complex auth

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{projectId} {
      // Anyone can read
      allow read: if true;
      
      // Writes expire on Dec 31, 2025 (update this date as needed)
      allow write: if request.time < timestamp.date(2025, 12, 31);
    }
  }
}
```

**Pros:**
- Simple setup
- Public can view projects
- Writes automatically disabled after expiry date

**Cons:**
- Need to update expiry date periodically
- Anyone can write before expiry

---

### 🔒 Option 3: Public Read, Firebase Auth Required (MOST SECURE)

**Use for:** Production portfolio with proper authentication

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{projectId} {
      // Anyone can read
      allow read: if true;
      
      // Only authenticated users can write
      allow write: if request.auth != null;
    }
  }
}
```

**Requires:** Firebase Authentication setup (see below)

---

## Setting Up Firebase Authentication (For Option 3)

### 1. Enable Email/Password Auth

1. Go to **Authentication** > **Sign-in method** in Firebase Console
2. Enable **Email/Password**
3. Click **Save**

### 2. Create Admin User

1. Go to **Authentication** > **Users**
2. Click **Add user**
3. Enter:
   - Email: `admin@yourdomain.com`
   - Password: Your admin password
4. Click **Add user**

### 3. Update Admin Page to Use Firebase Auth

Create a new file `src/lib/auth.ts`:

```typescript
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);

export async function loginAdmin(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function logoutAdmin() {
  return await signOut(auth);
}

export function getCurrentUser() {
  return auth.currentUser;
}
```

Then update your AdminPage.tsx login handler to use Firebase Auth instead of checking the password locally.

---

## Recommended Setup for Your Portfolio

For a portfolio website, I recommend **Option 2** (Time-Limited Write):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{projectId} {
      allow read: if true;
      allow write: if request.time < timestamp.date(2026, 12, 31);
    }
  }
}
```

**Why?**
- ✅ Simple to set up (no Firebase Auth needed)
- ✅ Public can view your projects
- ✅ You can manage projects from admin panel
- ✅ Automatically locks down after expiry
- ✅ Just update the date once a year

---

## Testing Your Rules

### Test in Firebase Console

1. Go to **Firestore Database** > **Rules**
2. Click **Rules Playground** tab
3. Test read/write operations
4. Verify they work as expected

### Test in Your App

1. Navigate to `/admin`
2. Login with password
3. Try adding a project
4. Verify it saves to Firestore
5. Refresh the portfolio page
6. Verify project appears

---

## Common Issues

### ❌ "Missing or insufficient permissions"

**Solution**: Your rules are too restrictive or not published yet
- Check rules are published in Firebase Console
- Verify the collection name matches (`projects`)
- For testing, temporarily use Option 1

### ❌ "Firebase not configured"

**Solution**: Your `.env` file is missing or incorrect
- Copy `.env.example` to `.env`
- Add your Firebase credentials
- Restart dev server

### ❌ Projects not saving

**Solution**: Check browser console for errors
- Verify Firebase credentials
- Check Firestore rules
- Ensure collection name is `projects`

---

## Security Best Practices

1. **Never commit `.env`** - Keep Firebase credentials private
2. **Use time limits** - Expire write access after a set date
3. **Monitor usage** - Check Firebase Console for unusual activity
4. **Backup data** - Export Firestore data regularly
5. **Set budget alerts** - Avoid unexpected Firebase charges

---

## Quick Reference

| Rule Type | Public Read | Public Write | Auth Required |
|-----------|-------------|--------------|---------------|
| Option 1 (Test) | ✅ | ✅ | ❌ |
| Option 2 (Simple) | ✅ | ⏰ Time-limited | ❌ |
| Option 3 (Secure) | ✅ | ❌ | ✅ |

---

## Next Steps

1. Choose a rule option (recommend Option 2)
2. Apply rules in Firebase Console
3. Test by adding a project from `/admin`
4. Update expiry date annually

For more help, see `FIREBASE_SETUP.md`
