"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { isFirebaseInitialized } from "@/lib/firebase"

export function FirebaseDebug() {
  const [showDetails, setShowDetails] = useState(false)

  const envVars = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "Set" : "Not set",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? "Set" : "Not set",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? "Set" : "Not set",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? "Set" : "Not set",
    measurementId: "G-Q337SR0CSL", // Hardcoded measurement ID
  }

  return (
    <Card className="w-full max-w-md mx-auto my-8">
      <CardHeader>
        <CardTitle>Firebase Configuration Status</CardTitle>
        <CardDescription>This component helps diagnose Firebase configuration issues</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Firebase Initialized:</span>
            <span className={isFirebaseInitialized ? "text-green-500" : "text-red-500"}>
              {isFirebaseInitialized ? "Yes" : "No"}
            </span>
          </div>

          {showDetails && (
            <div className="mt-4 space-y-2 text-sm">
              <h3 className="font-medium">Environment Variables:</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>API Key:</div>
                <div>{envVars.apiKey}</div>

                <div>Auth Domain:</div>
                <div>{envVars.authDomain}</div>

                <div>Project ID:</div>
                <div>{envVars.projectId}</div>

                <div>Storage Bucket:</div>
                <div>{envVars.storageBucket}</div>

                <div>Messaging Sender ID:</div>
                <div>{envVars.messagingSenderId}</div>

                <div>App ID:</div>
                <div>{envVars.appId}</div>

                <div>Measurement ID:</div>
                <div>{envVars.measurementId}</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={() => setShowDetails(!showDetails)} className="w-full">
          {showDetails ? "Hide Details" : "Show Details"}
        </Button>
      </CardFooter>
    </Card>
  )
}

