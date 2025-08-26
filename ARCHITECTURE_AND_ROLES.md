# Arquitectura de Archivos y Accesos de Roles - Gorillabs

Este documento mapea la estructura de archivos del proyecto Gorillabs y los accesos de roles inferidos, con el objetivo de identificar oportunidades de optimización.

## 1. Arquitectura de Archivos

Basado en la estructura de directorios y la guía `GEMINI.md`, el proyecto sigue la convención del App Router de Next.js:

```
gorillabs/
├── .git/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── manifest.ts
│   ├── (shop-layout)/  (Rutas principales de la tienda, accesibles por usuarios y público general)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── order-confirmation/
│   │   └── services/
│   │       └── [id]/
│   ├── about/
│   ├── account/          (Rutas relacionadas con la cuenta de usuario)
│   ├── admin/            (Panel de administración, acceso restringido)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── blog/
│   │   ├── chatbot/
│   │   ├── crm/
│   │   ├── languages/
│   │   ├── portfolio/
│   │   ├── seo/
│   │   ├── services/
│   │   └── website/
│   ├── api/              (Rutas de la API del backend)
│   │   └── chat/
│   ├── blog/
│   ├── contact/
│   ├── login/            (Ruta de autenticación)
│   ├── portfolio/
│   └── services/
├── components/           (Componentes de React reutilizables)
│   ├── ui/               (Componentes base de shadcn/ui)
│   └── admin/            (Componentes específicos para el panel de administración)
├── context/              (Proveedores de contexto de React: AuthContext, CartContext, LanguageContext)
├── data/                 (Archivos de datos estáticos: portfolio.json, services.json)
├── hooks/                (Hooks de React personalizados)
├── lib/                  (Funciones de utilidad, helpers y configuración de Firebase)
├── public/               (Archivos estáticos accesibles públicamente)
├── styles/               (Estilos globales)
├── ... (Archivos de configuración y otros)
```

## 2. Roles Inferreds y Acceso

Basado en la estructura de rutas y la mención de Firebase para autenticación, se infieren los siguientes roles principales:

*   **Público / Visitante:** Usuarios no autenticados.
    *   **Acceso:** Rutas públicas como `/`, `/blog`, `/services`, `/portfolio`, `/about`, `/contact`, `/login`. Pueden ver productos, servicios, información general.
*   **Usuario Autenticado / Cliente (Shop User):** Usuarios registrados y logueados.
    *   **Acceso:** Todas las rutas de `Público`, además de `/account`, `/cart`, `/checkout`, `/order-confirmation`. Pueden gestionar su perfil, realizar compras, ver historial de pedidos.
*   **Administrador (Admin):** Usuarios con privilegios de administración.
    *   **Acceso:** Todas las rutas de `Usuario Autenticado`, además de todas las rutas bajo `/admin`. Tienen acceso a la gestión de contenido (blog, portfolio, servicios), CRM, SEO, etc.

## 3. Mapeo de Acceso por Ruta/Componente

| Ruta/Componente Principal | Rol(es) con Acceso | Notas |
| :------------------------ | :----------------- | :---- |
| `/` (Home)                | Público, Cliente, Admin | Página de inicio. |
| `/blog`                   | Público, Cliente, Admin | Listado y detalle de artículos del blog. |
| `/services`               | Público, Cliente, Admin | Listado y detalle de servicios. |
| `/portfolio`              | Público, Cliente, Admin | Listado de proyectos del portfolio. |
| `/about`                  | Público, Cliente, Admin | Información sobre la empresa. |
| `/contact`                | Público, Cliente, Admin | Formulario de contacto. |
| `/login`                  | Público, Cliente, Admin | Página de inicio de sesión. |
| `/account`                | Cliente, Admin       | Gestión de perfil de usuario. Requiere autenticación. |
| `/cart`                   | Cliente, Admin       | Carrito de compras. Requiere autenticación. |
| `/checkout`               | Cliente, Admin       | Proceso de pago. Requiere autenticación. |
| `/order-confirmation`     | Cliente, Admin       | Confirmación de pedido. Requiere autenticación. |
| `/admin` (y sub-rutas)    | Admin              | Panel de administración. Requiere autenticación y rol de administrador. |
| `/api/*`                  | Depende de la API    | Las rutas de API deben tener su propia lógica de autorización. `api/chat` podría ser para todos los roles. |
| `components/admin/*`      | Admin              | Componentes específicos para la interfaz de administración. |
| `context/AuthContext`     | Todos los roles      | Gestiona el estado de autenticación para todos los usuarios. |

## 4. Áreas Potenciales de Optimización

*   **Gestión de Roles y Permisos:**
    *   **Centralización:** Asegurar que la lógica de autorización basada en roles esté centralizada (probablemente en `lib/firebase.ts` o un hook de autenticación) y sea reutilizable.
    *   **Granularidad:** Evaluar si los roles actuales son suficientes o si se necesita una granularidad más fina (ej. "Editor de Blog", "Gestor de CRM") para futuras expansiones.
    *   **Protección de Rutas:** Implementar o verificar que todas las rutas restringidas (`/admin`, `/account`, `/cart`, etc.) estén protegidas adecuadamente a nivel de Next.js (middleware o en los layouts) y a nivel de API.
*   **Carga de Componentes/Rutas:**
    *   **Code Splitting:** Next.js ya maneja el code splitting por ruta, pero revisar si hay componentes grandes que se cargan en rutas no administrativas y que solo son usados por administradores (ej. componentes de `components/admin/` que se importan accidentalmente en el layout principal).
    *   **Lazy Loading:** Utilizar `React.lazy` y `Suspense` para cargar componentes pesados solo cuando sean necesarios, especialmente en el panel de administración.
*   **Optimización de Datos:**
    *   **Consultas de Firebase:** Asegurar que las consultas a Firebase solo traigan los datos necesarios para el rol actual y la vista específica, evitando la sobre-obtención de datos.
    *   **Caché:** Implementar estrategias de caché para datos estáticos o poco cambiantes que son accesibles por múltiples roles.
*   **Seguridad:**
    *   **Validación de Entrada:** Asegurar que todas las entradas de usuario (especialmente en formularios y llamadas a la API) sean validadas y sanitizadas para prevenir ataques.
    *   **Variables de Entorno:** Gestionar las claves de API y credenciales de Firebase de forma segura usando variables de entorno.

Este mapeo inicial servirá como base para discusiones más profundas sobre la optimización del rendimiento y la seguridad.
