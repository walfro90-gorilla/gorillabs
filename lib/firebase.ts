// Import the functions you need from the SDKs you need
import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, type Auth } from "firebase/auth"

// Create a more robust initialization function
const createFirebaseApp = (): FirebaseApp | null => {
  try {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: "G-Q337SR0CSL", // Using the specific measurement ID provided
    }

    // Check if required config is present
    if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
      console.warn("Firebase configuration is incomplete. Some features may not work.")
      return null
    }

    // Initialize Firebase only if it hasn't been initialized already
    return !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]
  } catch (error) {
    console.error("Error initializing Firebase:", error)
    return null
  }
}

// Initialize Firebase with error handling
const app = createFirebaseApp()

// Initialize Auth services with fallbacks
let auth: Auth
let googleProvider: GoogleAuthProvider
let facebookProvider: FacebookAuthProvider

if (app) {
  try {
    auth = getAuth(app)
    googleProvider = new GoogleAuthProvider()
    facebookProvider = new FacebookAuthProvider()

    // Configure additional scopes for Google
    googleProvider.addScope("profile")
    googleProvider.addScope("email")

    // Configure additional scopes for Facebook
    facebookProvider.addScope("email")
    facebookProvider.addScope("public_profile")
  } catch (error) {
    console.error("Error initializing Firebase auth:", error)
    // Create dummy implementations
    auth = {} as Auth
    googleProvider = {} as GoogleAuthProvider
    facebookProvider = {} as FacebookAuthProvider
  }
} else {
  // Create dummy implementations
  auth = {} as Auth
  googleProvider = {} as GoogleAuthProvider
  facebookProvider = {} as FacebookAuthProvider
}

// Export a flag indicating if Firebase is properly initialized
const isFirebaseInitialized = !!app

export { auth, googleProvider, facebookProvider, isFirebaseInitialized }
