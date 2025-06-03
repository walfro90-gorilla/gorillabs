"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, ExternalLinkIcon } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function FirebaseDomainHelper() {
  const [open, setOpen] = useState(false)
  const { language } = useLanguage()

  // Get current domain
  const currentDomain = typeof window !== "undefined" ? window.location.origin : ""

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-2">
          {language === "en" ? "Fix Social Login" : "Arreglar Inicio de Sesión Social"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {language === "en" ? "Authorize Domain for Firebase" : "Autorizar Dominio para Firebase"}
          </DialogTitle>
          <DialogDescription>
            {language === "en"
              ? "Follow these steps to authorize this domain for Firebase authentication"
              : "Sigue estos pasos para autorizar este dominio para la autenticación de Firebase"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              {language === "en"
                ? "You need to add this domain to your Firebase project's authorized domains"
                : "Necesitas agregar este dominio a los dominios autorizados de tu proyecto de Firebase"}
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">{language === "en" ? "Current Domain" : "Dominio Actual"}:</h3>
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{currentDomain}</code>
          </div>

          <ol className="list-decimal pl-5 space-y-2 text-sm">
            <li>
              {language === "en" ? "Go to the Firebase Console" : "Ve a la Consola de Firebase"}
              <a
                href="https://console.firebase.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary inline-flex items-center ml-1 hover:underline"
              >
                <ExternalLinkIcon className="h-3 w-3 mr-1" />
                Firebase Console
              </a>
            </li>
            <li>{language === "en" ? "Select your project" : "Selecciona tu proyecto"}</li>
            <li>
              {language === "en"
                ? "Go to Authentication > Settings > Authorized domains"
                : "Ve a Autenticación > Configuración > Dominios autorizados"}
            </li>
            <li>
              {language === "en"
                ? "Click 'Add domain' and add the domain shown above"
                : "Haz clic en 'Agregar dominio' y agrega el dominio mostrado arriba"}
            </li>
            <li>
              {language === "en" ? "Save changes and refresh this page" : "Guarda los cambios y actualiza esta página"}
            </li>
          </ol>
        </div>

        <DialogFooter>
          <Button onClick={() => setOpen(false)}>{language === "en" ? "Close" : "Cerrar"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

