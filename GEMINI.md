# GEMINI.md - Guía del Proyecto

## Descripción General del Proyecto

Este documento proporciona una guía completa para desarrolladores que trabajen en el proyecto Gorillabs. El objetivo es centralizar el conocimiento, estandarizar prácticas y facilitar la incorporación de nuevos miembros al equipo.

## Tecnologías Utilizadas

El proyecto está construido sobre un stack moderno de JavaScript, aprovechando las siguientes tecnologías:

- **Framework Principal:** [Next.js](https://nextjs.org/) (v15) - Un framework de React para construir aplicaciones web renderizadas en el servidor (SSR) y generadas estáticamente (SSG).
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) - Un superconjunto de JavaScript que añade tipado estático opcional.
- **UI y Estilos:**
    - [Tailwind CSS](https://tailwindcss.com/) - Un framework de CSS "utility-first" para un diseño rápido y personalizado.
    - [shadcn/ui](https://ui.shadcn.com/) - Una colección de componentes de UI reutilizables.
    - [Radix UI](https://www.radix-ui.com/) - Primitivas de UI accesibles y no estilizadas que sirven como base para muchos componentes de `shadcn/ui`.
- **Gestión de Formularios:** [React Hook Form](https://react-hook-form.com/) - Una librería para gestionar formularios en React de manera eficiente y con validación.
- **Validación de Esquemas:** [Zod](https://zod.dev/) - Una librería de validación y declaración de esquemas para TypeScript.
- **Componentes Adicionales:**
    - `lucide-react` para iconos.
    - `recharts` para la creación de gráficos.
    - `embla-carousel-react` para carruseles.
- **Autenticación y Backend:** [Firebase](https://firebase.google.com/) - Se utiliza para servicios de backend, incluyendo autenticación y base de datos.
- **Gestor de Paquetes:** `pnpm` (inferido por `pnpm-lock.yaml`).

## Estructura del Proyecto

El proyecto sigue la estructura de directorios del App Router de Next.js:

- **/app/:** Contiene todas las rutas, layouts y páginas de la aplicación.
    - **/app/api/:** Rutas de la API del backend.
    - **/app/(shop-layout)/:** Rutas que comparten el layout principal de la tienda.
    - **/app/admin/:** Rutas para el panel de administración.
- **/components/:** Componentes de React reutilizables.
    - **/components/ui/:** Componentes base de `shadcn/ui`.
    - **/components/admin/:** Componentes específicos para el panel de administración.
- **/context/:** Contiene los proveedores de contexto de React (Ej: `AuthContext`, `CartContext`).
- **/data/:** Archivos de datos estáticos en formato JSON.
- **/hooks/:** Hooks de React personalizados.
- **/lib/:** Funciones de utilidad, helpers y la configuración de Firebase.
- **/public/:** Archivos estáticos accesibles públicamente (imágenes, iconos, etc.).
- **/styles/:** Estilos globales.

## Scripts Disponibles

Los siguientes scripts están definidos en `package.json`:

- `pnpm dev`: Inicia el servidor de desarrollo de Next.js.
- `pnpm build`: Compila la aplicación para producción.
- `pnpm start`: Inicia un servidor de producción.
- `pnpm lint`: Ejecuta el linter de Next.js para verificar la calidad del código.

## Configuración

- **`next.config.mjs`:** Archivo de configuración principal de Next.js.
- **`tailwind.config.ts`:** Configuración de Tailwind CSS, incluyendo temas, colores y plugins.
- **`tsconfig.json`:** Configuración del compilador de TypeScript.
- **`components.json`:** Archivo de configuración para la CLI de `shadcn/ui`.
