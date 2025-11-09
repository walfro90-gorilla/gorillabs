# Configuración de APIs

## Google Gemini API

### Obtener la API Key

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Crea un nuevo proyecto o selecciona uno existente
4. Genera una nueva API key
5. Copia la API key

### Configurar en el proyecto

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Agrega o actualiza la siguiente línea:
   ```
   GOOGLE_API_KEY=tu_api_key_aquí
   ```

### Verificar la configuración

1. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Ve a la sección "AI Showcase" en la página principal
3. Prueba el análisis de sentimientos o el generador de texto
4. Si ves el error "Google API key is not configured", verifica:
   - Que la API key esté correctamente copiada en `.env.local`
   - Que no haya espacios extra al inicio o final
   - Que el archivo `.env.local` esté en la raíz del proyecto
   - Que hayas reiniciado el servidor después de agregar la key

### Estructura de archivos

```
proyecto/
├── .env.local                    # ← Aquí va la API key
├── lib/gemini-advanced.ts        # Configuración de Gemini
├── app/api/sentiment/route.ts    # API route para análisis
├── app/api/generate-text/route.ts # API route para generación
└── components/ai-showcase/       # Componentes de UI
```

### Solución de problemas

**Error: "Google API key is not configured"**
- Verifica que `GOOGLE_API_KEY` esté en `.env.local`
- Reinicia el servidor de desarrollo
- Verifica que la API key sea válida en Google AI Studio

**Error: "API returned 400/403"**
- La API key puede estar incorrecta o expirada
- Verifica los permisos en Google Cloud Console
- Asegúrate de que la API de Gemini esté habilitada

**Error: "Quota exceeded"**
- Has alcanzado el límite de uso gratuito
- Verifica tu cuota en Google AI Studio
- Considera actualizar a un plan de pago si es necesario

### Seguridad

- **NUNCA** expongas la API key en el código del cliente
- Usa siempre API routes del servidor para llamadas a APIs externas
- El archivo `.env.local` está en `.gitignore` por seguridad
- Para producción, configura las variables de entorno en tu plataforma de hosting

### APIs disponibles

1. **Análisis de Sentimientos** (`/api/sentiment`)
   - POST con `{ text, language }`
   - Retorna análisis detallado del sentimiento

2. **Generación de Texto** (`/api/generate-text`)
   - POST con `{ prompt, context, language }`
   - Retorna texto generado por IA

### Ejemplo de uso

```javascript
// Análisis de sentimientos
const response = await fetch('/api/sentiment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: "Me encanta este producto!",
    language: "es"
  })
})

const result = await response.json()
console.log(result.text) // Análisis del sentimiento
```