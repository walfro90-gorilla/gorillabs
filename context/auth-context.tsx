"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
  type User as FirebaseUser,
} from "firebase/auth"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "./language-context"
import { auth, googleProvider, facebookProvider, isFirebaseInitialized } from "@/lib/firebase"

interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  photoURL?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  loginWithFacebook: () => Promise<boolean>
  logout: () => void
  isLoading: boolean
  isAdmin: boolean
  isFirebaseConfigured: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Admin email for role assignment
const ADMIN_EMAIL = "walfre.am@gmail.com"

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const { translations, language } = useLanguage()

  // Check if Firebase is properly configured
  const firebaseConfigured = isFirebaseInitialized

  // Convert Firebase user to our User type
  const formatUser = (firebaseUser: FirebaseUser): User => {
    const isAdmin = firebaseUser.email === ADMIN_EMAIL

    return {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
      email: firebaseUser.email || "",
      role: isAdmin ? "admin" : "user",
      photoURL: firebaseUser.photoURL || undefined,
    }
  }

  // Listen for auth state changes
  useEffect(() => {
    // If Firebase is not initialized, set loading to false and return
    if (!firebaseConfigured) {
      console.log("Firebase not configured, skipping auth listener")
      setIsLoading(false)
      return () => {}
    }

    try {
      const unsubscribe = onAuthStateChanged(
        auth,
        (firebaseUser) => {
          if (firebaseUser) {
            const formattedUser = formatUser(firebaseUser)
            setUser(formattedUser)
          } else {
            setUser(null)
          }
          setIsLoading(false)
        },
        (error) => {
          console.error("Auth state change error:", error)
          setIsLoading(false)
        },
      )

      return () => unsubscribe()
    } catch (error) {
      console.error("Error setting up auth listener:", error)
      setIsLoading(false)
      return () => {}
    }
  }, [firebaseConfigured])

  // Check for stored mock user on initial load
  useEffect(() => {
    if (!firebaseConfigured) {
      try {
        const storedUser = localStorage.getItem("mockUser")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Error loading stored user:", error)
      }
    }
  }, [firebaseConfigured])

  // Fallback to mock authentication if Firebase is not configured
  const mockLogin = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check for admin credentials
      const isAdmin = email === ADMIN_EMAIL && password === "123123123"

      // For regular users, basic validation
      if (!isAdmin && (!email.includes("@") || password.length < 6)) {
        toast({
          title: language === "en" ? "Error" : "Error",
          description: language === "en" ? "Invalid email or password" : "Correo o contraseña inválidos",
          variant: "destructive",
        })
        return false
      }

      // Create mock user
      const mockUser: User = {
        id: "user-" + Date.now(),
        name: isAdmin ? "Admin" : email.split("@")[0],
        email,
        role: isAdmin ? "admin" : "user",
      }

      setUser(mockUser)

      // Store in localStorage for persistence
      try {
        localStorage.setItem("mockUser", JSON.stringify(mockUser))
      } catch (error) {
        console.error("Error storing mock user:", error)
      }

      toast({
        title: language === "en" ? "Success" : "Éxito",
        description: isAdmin
          ? language === "en"
            ? "Logged in as administrator (Mock)"
            : "Sesión iniciada como administrador (Simulado)"
          : language === "en"
            ? "Logged in successfully (Mock)"
            : "Sesión iniciada con éxito (Simulado)",
      })

      return true
    } catch (error) {
      console.error("Mock login error:", error)
      toast({
        title: language === "en" ? "Error" : "Error",
        description: language === "en" ? "Failed to login" : "Error al iniciar sesión",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!firebaseConfigured) {
      return mockLogin(email, password)
    }

    setIsLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const formattedUser = formatUser(userCredential.user)

      toast({
        title: language === "en" ? "Success" : "Éxito",
        description:
          formattedUser.role === "admin"
            ? language === "en"
              ? "Logged in as administrator"
              : "Sesión iniciada como administrador"
            : language === "en"
              ? "Logged in successfully"
              : "Sesión iniciada con éxito",
      })

      return true
    } catch (error: any) {
      console.error("Login error:", error)
      toast({
        title: language === "en" ? "Error" : "Error",
        description: language === "en" ? "Invalid email or password" : "Correo o contraseña inválidos",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    if (!firebaseConfigured) {
      toast({
        title: language === "en" ? "Notice" : "Aviso",
        description:
          language === "en"
            ? "Firebase is not configured. Using mock authentication."
            : "Firebase no está configurado. Usando autenticación simulada.",
      })
      return mockLogin(email, password)
    }

    setIsLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Update profile with name
      await updateProfile(userCredential.user, {
        displayName: name,
      })

      toast({
        title: language === "en" ? "Success" : "Éxito",
        description: language === "en" ? "Account created successfully" : "Cuenta creada con éxito",
      })

      return true
    } catch (error: any) {
      console.error("Signup error:", error)

      let errorMessage = language === "en" ? "Failed to create account" : "Error al crear la cuenta"

      if (error.code === "auth/email-already-in-use") {
        errorMessage = language === "en" ? "Email already in use" : "El correo ya está en uso"
      } else if (error.code === "auth/weak-password") {
        errorMessage = language === "en" ? "Password is too weak" : "La contraseña es demasiado débil"
      }

      toast({
        title: language === "en" ? "Error" : "Error",
        description: errorMessage,
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async (): Promise<boolean> => {
    if (!firebaseConfigured) {
      toast({
        title: language === "en" ? "Error" : "Error",
        description:
          language === "en"
            ? "Firebase is not configured. Social login is unavailable."
            : "Firebase no está configurado. El inicio de sesión social no está disponible.",
        variant: "destructive",
      })
      return false
    }

    setIsLoading(true)

    try {
      const result = await signInWithPopup(auth, googleProvider)

      toast({
        title: language === "en" ? "Success" : "Éxito",
        description: language === "en" ? "Logged in with Google successfully" : "Sesión iniciada con Google con éxito",
      })

      return true
    } catch (error: any) {
      console.error("Google login error:", error)

      // Handle specific error for unauthorized domain
      if (error.code === "auth/unauthorized-domain") {
        toast({
          title: language === "en" ? "Domain Not Authorized" : "Dominio No Autorizado",
          description:
            language === "en"
              ? "This domain is not authorized for Google login. Please use email/password login instead."
              : "Este dominio no está autorizado para inicio de sesión con Google. Por favor, use inicio de sesión con correo/contraseña.",
          variant: "destructive",
        })
      } else {
        toast({
          title: language === "en" ? "Error" : "Error",
          description: language === "en" ? "Failed to login with Google" : "Error al iniciar sesión con Google",
          variant: "destructive",
        })
      }
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithFacebook = async (): Promise<boolean> => {
    if (!firebaseConfigured) {
      toast({
        title: language === "en" ? "Error" : "Error",
        description:
          language === "en"
            ? "Firebase is not configured. Social login is unavailable."
            : "Firebase no está configurado. El inicio de sesión social no está disponible.",
        variant: "destructive",
      })
      return false
    }

    setIsLoading(true)

    try {
      const result = await signInWithPopup(auth, facebookProvider)

      toast({
        title: language === "en" ? "Success" : "Éxito",
        description:
          language === "en" ? "Logged in with Facebook successfully" : "Sesión iniciada con Facebook con éxito",
      })

      return true
    } catch (error: any) {
      console.error("Facebook login error:", error)

      // Handle specific error for unauthorized domain
      if (error.code === "auth/unauthorized-domain") {
        toast({
          title: language === "en" ? "Domain Not Authorized" : "Dominio No Autorizado",
          description:
            language === "en"
              ? "This domain is not authorized for Facebook login. Please use email/password login instead."
              : "Este dominio no está autorizado para inicio de sesión con Facebook. Por favor, use inicio de sesión con correo/contraseña.",
          variant: "destructive",
        })
      } else {
        toast({
          title: language === "en" ? "Error" : "Error",
          description: language === "en" ? "Failed to login with Facebook" : "Error al iniciar sesión con Facebook",
          variant: "destructive",
        })
      }
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    if (!firebaseConfigured) {
      setUser(null)
      try {
        localStorage.removeItem("mockUser")
      } catch (error) {
        console.error("Error removing stored user:", error)
      }
      toast({
        title: language === "en" ? "Logged out" : "Sesión cerrada",
        description:
          language === "en"
            ? "You have been logged out successfully (Mock)"
            : "Has cerrado sesión con éxito (Simulado)",
      })
      return
    }

    try {
      await signOut(auth)
      toast({
        title: language === "en" ? "Logged out" : "Sesión cerrada",
        description: language === "en" ? "You have been logged out successfully" : "Has cerrado sesión con éxito",
      })
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: language === "en" ? "Error" : "Error",
        description: language === "en" ? "Failed to logout" : "Error al cerrar sesión",
        variant: "destructive",
      })
    }
  }

  const isAdmin = user?.role === "admin"

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        loginWithGoogle,
        loginWithFacebook,
        logout,
        isLoading,
        isAdmin,
        isFirebaseConfigured: firebaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

