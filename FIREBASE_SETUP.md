# Firebase Setup Guide

This project uses Firebase Firestore to store project data. Follow these steps to set up Firebase:

## 1. Install Firebase Package

Run this command to install Firebase:

```bash
npm install firebase
```

## 2. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

## 3. Create a Firestore Database

1. In your Firebase project, go to **Build** > **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development)
4. Select a Cloud Firestore location
5. Click **Enable**

## 4. Get Firebase Configuration

1. Go to **Project Settings** (gear icon) > **General**
2. Scroll down to **Your apps** section
3. Click the **Web** icon (`</>`) to add a web app
4. Register your app with a nickname (e.g., "Portfolio Admin")
5. Copy the `firebaseConfig` object values

## 5. Create Environment File

1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Edit `.env` and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXX
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
   ```

## 6. Set Up Firestore Security Rules (Optional but Recommended)

For production, update your Firestore security rules:

1. Go to **Firestore Database** > **Rules**
2. Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all projects
    match /projects/{projectId} {
      allow read: if true;
      allow write: if request.auth != null; // Requires authentication
    }
  }
}
```

## 7. Restart Development Server

After setting up `.env`, restart your development server:

```bash
npm run dev
```

## Fallback Behavior

If Firebase is not configured, the application will automatically use **localStorage** as a fallback. This means:
- Projects will be stored in the browser's localStorage
- Data will be local to each browser/device
- No backend storage or sync across devices

## Testing

1. Open the admin panel (Ctrl + Shift + Enter or long-press hamburger menu)
2. Login with password: `Sushhora`
3. Add a test project
4. Check Firebase Console > Firestore Database to verify data is stored

## Troubleshooting

**Problem**: "Firebase not configured" warning
- **Solution**: Make sure `.env` file exists and has correct values

**Problem**: Permission denied errors
- **Solution**: Check Firestore security rules or start in test mode

**Problem**: Changes not appearing
- **Solution**: Restart the development server after modifying `.env`
