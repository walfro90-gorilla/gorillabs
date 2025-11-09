# Dependencies Documentation

Este documento describe todas las dependencias instaladas para el proyecto de homepage impresionante de Gorilla Labs.

## Dependencias Principales

### Three.js Ecosystem

#### `three` (latest)
- **Propósito**: Biblioteca principal para gráficos 3D y WebGL
- **Uso**: Sistema de partículas 3D, shaders personalizados, efectos visuales
- **Documentación**: https://threejs.org/docs/

#### `@react-three/fiber` (latest)
- **Propósito**: Renderer de React para Three.js
- **Uso**: Integración declarativa de Three.js con React
- **Documentación**: https://docs.pmnd.rs/react-three-fiber/

#### `@react-three/drei` (latest)
- **Propósito**: Helpers y utilidades para React Three Fiber
- **Uso**: Componentes pre-construidos, controles de cámara, efectos
- **Documentación**: https://github.com/pmndrs/drei

### Animaciones

#### `gsap` (latest)
- **Propósito**: GreenSock Animation Platform - animaciones de alto rendimiento
- **Uso**: Micro-interacciones, scroll animations, counters animados
- **Plugins incluidos**: ScrollTrigger
- **Documentación**: https://greensock.com/docs/

#### `framer-motion` (^10.16.16) - Ya instalado
- **Propósito**: Biblioteca de animaciones para React
- **Uso**: Animaciones simples, transiciones de página
- **Documentación**: https://www.framer.com/motion/

### Code Editor & Execution

#### `@monaco-editor/react` (latest)
- **Propósito**: Monaco Editor (el editor de VS Code) para React
- **Uso**: Editor de código en vivo para demos interactivas
- **Características**: Syntax highlighting, auto-completion, multi-language
- **Documentación**: https://github.com/suren-atoyan/monaco-react

#### `@codesandbox/sandpack-react` (latest)
- **Propósito**: Sandbox de ejecución de código en el navegador
- **Uso**: Ejecutar código de forma segura en demos interactivas
- **Características**: Ejecución aislada, timeout, manejo de errores
- **Documentación**: https://sandpack.codesandbox.io/

### Data Visualization

#### `recharts` (latest) - Ya instalado
- **Propósito**: Biblioteca de gráficos para React
- **Uso**: Visualizaciones de datos en case studies
- **Documentación**: https://recharts.org/

## Configuración de Next.js

### Optimizaciones en `next.config.mjs`

```javascript
experimental: {
  optimizePackageImports: [
    'three',
    '@react-three/fiber',
    '@react-three/drei',
    'recharts',
  ],
}
```

### Webpack Configuration

- **GLSL Shaders**: Configurado para importar archivos `.glsl`, `.vs`, `.fs`, `.vert`, `.frag`
- **Tree Shaking**: Optimización automática de Three.js
- **Code Splitting**: Separación automática de bundles pesados

## Utilidades Creadas

### `lib/dynamic-imports.ts`

Exporta componentes con lazy loading optimizado:

- `DynamicParticleBackground` - Sistema de partículas 3D
- `DynamicShaderGradient` - Gradientes con shaders
- `DynamicCodeEditor` - Editor Monaco
- `DynamicInteractiveDemo` - Demos con Sandpack
- `DynamicTechStackGrid` - Grid de tecnologías
- `DynamicCaseStudyCard` - Tarjetas de casos de estudio
- `DynamicAnimatedCounter` - Contadores animados
- `DynamicDataVisualization` - Gráficos Recharts
- `DynamicProjectEstimator` - Estimador de proyectos
- `DynamicScrollAnimationWrapper` - Wrapper de animaciones

**Funciones de utilidad:**
- `isWebGLSupported()` - Detecta soporte de WebGL
- `detectDevicePerformance()` - Detecta rendimiento del dispositivo
- `getOptimalParticleCount()` - Calcula cantidad óptima de partículas
- `prefersReducedMotion()` - Detecta preferencia de movimiento reducido

### `lib/gsap-config.ts`

Configuración centralizada de GSAP:

**Presets de animación:**
- `fadeIn` - Aparición con fade
- `slideUp` - Deslizar desde abajo
- `slideDown` - Deslizar desde arriba
- `slideLeft` - Deslizar desde derecha
- `slideRight` - Deslizar desde izquierda
- `scale` - Escalar con bounce
- `rotate` - Rotar con fade

**Funciones de utilidad:**
- `createScrollAnimation()` - Crear animación con scroll trigger
- `createStaggeredScrollAnimation()` - Animación escalonada
- `animateCounter()` - Animar números
- `createHoverAnimation()` - Animación en hover
- `createParallaxEffect()` - Efecto parallax
- `killAllScrollTriggers()` - Limpiar triggers
- `refreshScrollTrigger()` - Refrescar triggers

### `lib/three-config.ts`

Configuración y utilidades para Three.js:

**Clases:**
- `FPSMonitor` - Monitor de FPS en tiempo real
- `AdaptiveQualityManager` - Ajuste automático de calidad según FPS

**Funciones:**
- `isWebGLAvailable()` - Verificar soporte WebGL
- `getWebGLCapabilities()` - Obtener capacidades WebGL
- `getPerformanceSettings()` - Configuración según rendimiento
- `getParticleConfig()` - Configuración de partículas
- `disposeObject()` - Limpiar objetos Three.js
- `disposeRenderer()` - Limpiar renderer

**Configuraciones:**
- `defaultRendererSettings` - Configuración base del renderer
- `particleConfig` - Configuración de partículas por nivel
- `threeColors` - Colores de marca en formato Three.js

## Estrategia de Carga

### SSR (Server-Side Rendering)

**Deshabilitado para:**
- Three.js components (requieren `window`)
- Monaco Editor (requieren `window`)
- Sandpack (requieren `window`)

**Habilitado para:**
- Componentes de UI
- Componentes de layout
- Componentes de datos

### Code Splitting

Todos los componentes pesados se cargan dinámicamente:

```typescript
const Component = dynamic(
  () => import('./component'),
  { 
    ssr: false,  // Deshabilitar SSR si usa window
    loading: LoadingComponent  // Mostrar mientras carga
  }
)
```

### Lazy Loading

- Componentes se cargan solo cuando son visibles
- Intersection Observer para detectar visibilidad
- Prioridad de carga basada en importancia

## Performance Monitoring

### FPS Tracking

```typescript
const monitor = new FPSMonitor((fps) => {
  console.log('Current FPS:', fps)
})

// En animation loop
monitor.update()
```

### Adaptive Quality

```typescript
const manager = new AdaptiveQualityManager((quality) => {
  console.log('Quality changed to:', quality)
  // Ajustar configuración según calidad
})

// En animation loop
manager.update()
```

## Troubleshooting

### Error: "WebGL not supported"

**Solución**: Los componentes automáticamente hacen fallback a CSS animations

```typescript
if (!isWebGLSupported()) {
  // Usar CSS animations en su lugar
}
```

### Error: "Module not found"

**Solución**: Asegurarse de que los componentes existan antes de importarlos

```typescript
// Los dynamic imports fallarán hasta que los componentes sean creados
```

### Performance Issues

**Solución**: Usar AdaptiveQualityManager para ajustar automáticamente

```typescript
const manager = new AdaptiveQualityManager((quality) => {
  if (quality === 'low') {
    // Reducir partículas, deshabilitar sombras, etc.
  }
})
```

## Próximos Pasos

1. ✅ Instalar dependencias
2. ✅ Configurar Next.js
3. ✅ Crear utilidades de carga
4. ⏳ Crear componentes de efectos visuales (Tarea 3)
5. ⏳ Crear componentes de animación (Tarea 8)
6. ⏳ Crear componentes de código (Tarea 5)

## Comandos Útiles

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Verificar bundle size
npm run build

# Analizar bundle
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build

# Limpiar cache
rm -rf .next node_modules
npm install --legacy-peer-deps
```

## Referencias

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [GSAP Documentation](https://greensock.com/docs/)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Sandpack](https://sandpack.codesandbox.io/)
- [Next.js Dynamic Imports](https://nextjs.org/docs/advanced-features/dynamic-import)
