# Instrucciones de Configuración - Gorilla Labs

## Configuración Inicial

### 1. Instalar Dependencias

```bash
npm install
# o
pnpm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google APIs
GOOGLE_API_KEY=your_google_api_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
GOOGLE_CLOUD_PROJECT_ID=your_google_cloud_project_id

# Firebase (opcional - puede ser removido después de migrar completamente a Supabase)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

### 3. Configurar Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ve al SQL Editor en el dashboard de Supabase
3. Ejecuta el contenido del archivo `supabase-schema.sql` para crear las tablas necesarias
4. Copia la URL del proyecto y la Anon Key desde Settings > API
5. Agrega estas credenciales a tu archivo `.env.local`

### 4. Configurar Google APIs

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita las siguientes APIs:
   - Google Maps JavaScript API
   - Google Places API
   - Google Translate API
   - Google Vision API
   - Generative AI API (para Gemini)
4. Crea credenciales (API Key) en APIs & Services > Credentials
5. Restringe la API Key a los dominios necesarios para producción
6. Agrega las credenciales a tu archivo `.env.local`

### 5. Ejecutar el Proyecto

```bash
npm run dev
# o
pnpm dev
```

El proyecto estará disponible en `http://localhost:3000`

## Características Implementadas

### ✅ One-Page Fullstack
- Estructura one-page con scroll suave entre secciones
- Navegación por anclas con scroll suave
- Animaciones con Framer Motion

### ✅ Internacionalización (i18n)
- Soporte completo para inglés (EN)
- Soporte completo para español (ES)
- Soporte completo para chino (ZH)
- Detección automática de idioma del navegador
- Selector de idioma en el header

### ✅ Supabase Integration
- Cliente de Supabase configurado
- Esquema de base de datos (contacts, leads, ai_interactions)
- Row Level Security (RLS) habilitado
- API endpoints para contactos
- Autenticación lista para migrar desde Firebase

### ✅ Google Maps Integration
- Componente de rastreador logístico
- Mapa interactivo con ubicaciones de oficinas
- Marcadores personalizados
- InfoWindows con información de oficinas

### ✅ AI Modules
- Chat AI mejorado con Gemini
- Análisis de sentimientos
- Generador de texto con IA
- Integración con Google Gemini API
- APIs para análisis y generación

### ✅ Performance Optimization
- Lazy loading de componentes pesados
- Code splitting automático
- Optimización de imágenes (AVIF, WebP)
- Compresión habilitada
- Optimización de bundle size

### ✅ Security
- Todas las API keys movidas a variables de entorno
- Eliminación de keys hardcodeadas
- RLS en Supabase para seguridad de datos

## Estructura del Proyecto

```
gorillabs/
├── app/
│   ├── page.tsx              # Página principal one-page
│   ├── api/
│   │   ├── chat/             # API de chat con Gemini
│   │   ├── ai/                # APIs de AI (sentiment, generate)
│   │   └── contacts/          # API de contactos con Supabase
│   └── ...
├── components/
│   ├── ai-showcase/           # Módulos de AI
│   │   ├── sentiment-analysis.tsx
│   │   ├── text-generator.tsx
│   │   └── ai-showcase-section.tsx
│   ├── google-maps/           # Componentes de Google Maps
│   │   └── logistics-tracker.tsx
│   └── ...
├── lib/
│   ├── supabase.ts            # Cliente de Supabase
│   ├── google-maps.ts         # Configuración de Google Maps
│   └── gemini-advanced.ts     # Funciones avanzadas de Gemini
├── context/
│   └── language-context.tsx   # Contexto de idioma (EN/ES/ZH)
└── supabase-schema.sql        # Esquema de base de datos
```

## Próximos Pasos

1. **Configurar Supabase en producción**: Asegúrate de tener las credenciales correctas
2. **Configurar Google APIs**: Habilita todas las APIs necesarias y restringe las keys
3. **Migrar autenticación a Supabase**: Reemplazar Firebase Auth con Supabase Auth
4. **Implementar Google Places API**: Para búsqueda de lugares
5. **Implementar Google Translate API**: Para traducción en tiempo real
6. **Implementar Google Vision API**: Para análisis de imágenes
7. **Testing**: Probar todas las funcionalidades en desarrollo antes de producción

## Notas Importantes

- El proyecto usa Next.js 15 con App Router
- Todas las API keys deben estar en variables de entorno
- El esquema de Supabase debe ejecutarse antes de usar las funcionalidades de base de datos
- Google Maps requiere una API key válida y habilitada
- Gemini API requiere una API key válida de Google Cloud

## Soporte

Para más información, contacta al equipo de desarrollo en info@gorillabs.dev

