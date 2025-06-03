# Firebase Setup for Gorilla Labs Website

This document provides instructions on how to set up Firebase Authentication for the Gorilla Labs website.

## Prerequisites

1. A Google account
2. A Firebase project (free tier is sufficient)

## Steps to Set Up Firebase

### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Follow the setup wizard to create your project
4. Give your project a name (e.g., "Gorilla Labs Website")
5. Choose whether to enable Google Analytics (recommended)
6. Accept the terms and click "Create project"

### 2. Set Up Authentication

1. In your Firebase project console, click on "Authentication" in the left sidebar
2. Click on the "Get started" button
3. Enable the sign-in methods you want to use:
   - Email/Password
   - Google
   - Facebook
4. For Google authentication:
   - Simply enable it (no additional configuration needed)
5. For Facebook authentication:
   - You'll need to create a Facebook Developer App
   - Follow the instructions provided by Firebase to set up Facebook Login

### 3. Get Your Firebase Configuration

1. In your Firebase project console, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to the "Your apps" section
4. Click on the web app icon (</>) to add a web app if you haven't already
5. Register your app with a nickname
6. Copy the Firebase configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
