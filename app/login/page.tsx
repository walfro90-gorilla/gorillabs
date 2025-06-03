"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { FirebaseDomainHelper } from "@/components/firebase-domain-helper"

// Helper to check if we're in a development environment
const isDevelopmentEnvironment = () => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname
    return hostname === "localhost" || hostname === "127.0.0.1" || hostname.includes(".vercel.app")
  }
  return false
}

export default function LoginPage() {
  const { login, signup, loginWithGoogle, isLoading, isFirebaseConfigured } = useAuth()
  const { translations, language } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get("redirect") || "/"

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignupData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login(loginData.email, loginData.password)
    if (success) {
      router.push(redirectPath)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    const success = await signup(signupData.name, signupData.email, signupData.password)
    if (success) {
      router.push(redirectPath)
    }
  }

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogle()
    if (success) {
      router.push(redirectPath)
    }
  }

  return (
    <div className="container flex min-h-[80vh] items-center justify-center py-16">
      <Card className="mx-auto w-full max-w-md">
        {!isFirebaseConfigured && (
          <Alert className="mb-4">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>{language === "en" ? "Firebase Not Configured" : "Firebase No Configurado"}</AlertTitle>
            <AlertDescription>
              {language === "en"
                ? "Firebase is not properly configured. Social login is disabled. You can still use email/password login with mock authentication."
                : "Firebase no está configurado correctamente. El inicio de sesión social está deshabilitado. Aún puede usar el inicio de sesión con correo/contraseña con autenticación simulada."}
            </AlertDescription>
          </Alert>
        )}

        {isFirebaseConfigured && isDevelopmentEnvironment() && (
          <Alert className="mb-4" variant="warning">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>{language === "en" ? "Development Environment" : "Entorno de Desarrollo"}</AlertTitle>
            <AlertDescription>
              {language === "en"
                ? "You're using a development environment. Social login may not work unless this domain is authorized in the Firebase console."
                : "Estás usando un entorno de desarrollo. El inicio de sesión social puede no funcionar a menos que este dominio esté autorizado en la consola de Firebase."}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{translations.auth.login}</TabsTrigger>
            <TabsTrigger value="signup">{translations.auth.signup}</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardHeader>
                <CardTitle>{translations.auth.login}</CardTitle>
                <CardDescription>Enter your email and password to access your account</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={loginData.email}
                    onChange={handleLoginChange}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={loginData.password}
                    onChange={handleLoginChange}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Loading..." : translations.auth.login}
                </Button>

                {isFirebaseConfigured && (
                  <>
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          {language === "en" ? "Or continue with" : "O continuar con"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                          <path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                        Google
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup}>
              <CardHeader>
                <CardTitle>{translations.auth.signup}</CardTitle>
                <CardDescription>Create a new account to get started</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    value={signupData.name}
                    onChange={handleSignupChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={signupData.email}
                    onChange={handleSignupChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    required
                    value={signupData.password}
                    onChange={handleSignupChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    required
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Loading..." : translations.auth.signup}
                </Button>

                {isFirebaseConfigured && (
                  <>
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          {language === "en" ? "Or sign up with" : "O regístrate con"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                          <path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                        Google
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </form>
          </TabsContent>
        </Tabs>

        <CardFooter className="flex flex-col items-center text-sm text-muted-foreground">
          <p className="w-full text-center">
            {!isFirebaseConfigured &&
              (language === "en"
                ? "Using mock authentication. Email/password login only."
                : "Usando autenticación simulada. Solo inicio de sesión con correo/contraseña.")}
            {isFirebaseConfigured &&
              isDevelopmentEnvironment() &&
              (language === "en"
                ? "Having trouble with social login? You may need to authorize this domain."
                : "¿Problemas con el inicio de sesión social? Es posible que debas autorizar este dominio.")}
          </p>
          {isFirebaseConfigured && isDevelopmentEnvironment() && <FirebaseDomainHelper />}
        </CardFooter>
      </Card>
    </div>
  )
}
