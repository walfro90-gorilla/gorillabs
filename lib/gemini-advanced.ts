const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''

// Log para debugging (solo en desarrollo)
if (process.env.NODE_ENV === 'development') {
  console.log('GOOGLE_API_KEY configured:', !!GOOGLE_API_KEY)
  console.log('API Key length:', GOOGLE_API_KEY.length)
}

interface GeminiResponse {
  text: string
  error?: string
}

// Configuración base para Gemini
const getGeminiConfig = (prompt: string, language: string = 'es') => {
  return {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048
    },
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE'
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE'
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE'
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE'
      }
    ]
  }
}

// Función base para llamar a Gemini
export const callGeminiAPI = async (
  prompt: string,
  model: string = 'gemini-1.5-flash-latest',
  language: string = 'es'
): Promise<GeminiResponse> => {
  if (!GOOGLE_API_KEY) {
    return {
      text: '',
      error: 'Google API key is not configured'
    }
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(getGeminiConfig(prompt, language))
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Gemini API Error:', response.status, errorData)
      return {
        text: '',
        error: `API returned ${response.status}`
      }
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

    return { text }
  } catch (error) {
    console.error('Error calling Gemini API:', error)
    return {
      text: '',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Análisis de sentimientos
export const analyzeSentiment = async (text: string, language: string = 'es'): Promise<GeminiResponse> => {
  const prompt = `Analiza el sentimiento del siguiente texto y proporciona:
1. Sentimiento general (positivo, negativo, neutro)
2. Puntuación de sentimiento (0-100, donde 100 es muy positivo)
3. Palabras clave que indican el sentimiento
4. Resumen breve del análisis

Texto a analizar: "${text}"

Responde en ${language === 'es' ? 'español' : language === 'en' ? 'inglés' : 'chino'}.`

  return callGeminiAPI(prompt, 'gemini-1.5-flash-latest', language)
}

// Generación de texto
export const generateText = async (
  prompt: string,
  context: string = '',
  language: string = 'es'
): Promise<GeminiResponse> => {
  const fullPrompt = context
    ? `Contexto: ${context}\n\nInstrucción: ${prompt}\n\nResponde en ${language === 'es' ? 'español' : language === 'en' ? 'inglés' : 'chino'}.`
    : `${prompt}\n\nResponde en ${language === 'es' ? 'español' : language === 'en' ? 'inglés' : 'chino'}.`

  return callGeminiAPI(fullPrompt, 'gemini-1.5-pro-latest', language)
}

// Generación de imágenes (usando Imagen 3 de Google)
export const generateImage = async (prompt: string): Promise<{ imageUrl?: string; error?: string }> => {
  if (!GOOGLE_API_KEY) {
    return { error: 'Google API key is not configured' }
  }

  try {
    // Nota: Google Imagen API requiere configuración diferente
    // Por ahora, usamos una aproximación con Gemini para describir imágenes
    const imagePrompt = `Genera una descripción detallada para crear una imagen con: ${prompt}`
    
    const response = await callGeminiAPI(imagePrompt)
    
    if (response.error) {
      return { error: response.error }
    }

    // En producción, aquí se integraría con Google Imagen API o DALL-E
    return {
      imageUrl: undefined,
      error: 'Image generation API not fully configured. Description generated: ' + response.text
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Traducción
export const translateText = async (
  text: string,
  targetLanguage: string,
  sourceLanguage: string = 'auto'
): Promise<GeminiResponse> => {
  const prompt = `Traduce el siguiente texto del ${sourceLanguage === 'auto' ? 'idioma detectado automáticamente' : sourceLanguage} al ${targetLanguage}. Solo proporciona la traducción, sin explicaciones adicionales.

Texto: "${text}"`

  return callGeminiAPI(prompt, 'gemini-1.5-flash-latest', targetLanguage)
}

// Análisis de código
export const analyzeCode = async (code: string, language: string = 'es'): Promise<GeminiResponse> => {
  const prompt = `Analiza el siguiente código y proporciona:
1. Descripción de lo que hace el código
2. Posibles mejoras o optimizaciones
3. Errores potenciales
4. Buenas prácticas aplicadas o que deberían aplicarse

Código:
\`\`\`
${code}
\`\`\`

Responde en ${language === 'es' ? 'español' : language === 'en' ? 'inglés' : 'chino'}.`

  return callGeminiAPI(prompt, 'gemini-1.5-pro-latest', language)
}

