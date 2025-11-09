# Tech Stack Showcase Section

Sección completa de demostración de tecnologías con editores de código en vivo y ejecución real.

## Componentes

### TechShowcaseSection

Componente principal que integra todo el showcase.

**Ubicación**: `components/tech-showcase/tech-showcase-section.tsx`

**Uso**:
```tsx
import { TechShowcaseSection } from '@/components/tech-showcase/tech-showcase-section'

<TechShowcaseSection />
```

---

### TechStackGrid

Grid de tecnologías con animaciones 3D y filtrado por categoría.

**Características**:
- 17 tecnologías en 5 categorías
- Animaciones 3D con GSAP (rotación en hover)
- Filtrado interactivo por categoría
- Glassmorphic cards con glow effects
- Estadísticas en tiempo real
- Responsive grid (1-5 columnas)

**Props**:
```typescript
interface TechStackGridProps {
  technologies?: Technology[]
  onTechClick?: (tech: Technology) => void
  filterCategory?: string
}
```

**Uso**:
```tsx
import { TechStackGrid } from '@/components/tech-showcase/tech-stack-grid'

<TechStackGrid
  onTechClick={(tech) => console.log(tech)}
/>
```

---

### InteractiveDemo

Modal con editor de código y ejecución.

**Características**:
- Modal fullscreen con backdrop blur
- Vista expandible/minimizable
- Toggle entre Editor y Live Preview
- Copy to clipboard
- Animaciones GSAP
- Monaco Editor integrado
- Sandpack para ejecución real

**Props**:
```typescript
interface InteractiveDemoProps {
  technology: Technology
  onClose?: () => void
}
```

**Uso**:
```tsx
import { InteractiveDemo } from '@/components/tech-showcase/interactive-demo'

<InteractiveDemo
  technology={selectedTech}
  onClose={() => setSelectedTech(null)}
/>
```

---

### CodeEditor

Editor de código con Monaco (VS Code).

**Características**:
- Monaco Editor completo
- Syntax highlighting
- Keyboard shortcuts (Ctrl/Cmd + Enter)
- Font ligatures (JetBrains Mono)
- Auto-layout
- Dark theme

**Props**:
```typescript
interface CodeEditorProps {
  initialCode: string
  language: string
  onChange: (code: string) => void
  onRun: () => void
  readOnly?: boolean
  theme?: 'light' | 'dark'
  height?: string
}
```

**Uso**:
```tsx
import { CodeEditor } from '@/components/tech-showcase/code-editor'

<CodeEditor
  initialCode="console.log('Hello')"
  language="javascript"
  onChange={setCode}
  onRun={handleRun}
/>
```

---

### CodeSandbox

Sandbox de ejecución real con Sandpack.

**Características**:
- Ejecución real de código
- Preview en vivo
- Console integrada
- Auto-reload
- Templates: React, React-TS, Vanilla, Static
- Performance metrics

**Props**:
```typescript
interface CodeSandboxProps {
  code: string
  language: string
  onExecute?: (result: ExecutionResult) => void
}
```

**Uso**:
```tsx
import { CodeSandbox } from '@/components/tech-showcase/code-sandbox'

<CodeSandbox
  code={code}
  language="javascript"
  onExecute={(result) => console.log(result)}
/>
```

---

## Datos

### technologies.json

Archivo con todas las tecnologías y sus demos.

**Ubicación**: `data/technologies.json`

**Estructura**:
```json
{
  "technologies": [
    {
      "id": "react",
      "name": "React",
      "icon": "⚛️",
      "category": "frontend",
      "expertiseLevel": 5,
      "projectCount": 25,
      "description": "...",
      "demoCode": {
        "language": "jsx",
        "code": "...",
        "description": "..."
      }
    }
  ]
}
```

**Categorías**:
- `frontend`: React, Next.js, TypeScript, Tailwind, Three.js
- `backend`: Node.js, Python, Firebase, Supabase
- `mobile`: Flutter, React Native
- `ai`: Gemini AI, OpenAI, TensorFlow
- `devops`: Docker, Kubernetes, GitHub Actions

---

## Flujo de Usuario

1. **Ver Grid**: Usuario ve todas las tecnologías en un grid animado
2. **Filtrar**: Puede filtrar por categoría (Frontend, Backend, etc.)
3. **Click en Tech**: Al hacer click, se abre el InteractiveDemo
4. **Ver Demo**: Ve el código de ejemplo en el editor
5. **Editar**: Puede editar el código en tiempo real
6. **Ejecutar**: 
   - Modo "Editor": Ejecución simulada con output
   - Modo "Live Preview": Ejecución real con Sandpack
7. **Copiar**: Puede copiar el código al clipboard
8. **Cerrar**: Cierra el modal y vuelve al grid

---

## Animaciones

### Entrance Animations (GSAP)

**TechCard**:
```javascript
gsap.from(card, {
  scale: 0,
  opacity: 0,
  rotationY: 180,
  duration: 0.6,
  delay: index * 0.05,
  ease: 'back.out(1.7)',
})
```

**InteractiveDemo**:
```javascript
gsap.from(modal, {
  scale: 0.8,
  opacity: 0,
  duration: 0.4,
  ease: 'back.out(1.7)',
})
```

### Hover Animations

**3D Rotation**:
```javascript
gsap.to(card, {
  rotationY: 10,
  rotationX: -10,
  scale: 1.05,
  duration: 0.3,
})
```

---

## Performance

### Bundle Sizes

- TechStackGrid: ~8KB
- InteractiveDemo: ~12KB
- CodeEditor (Monaco): ~600KB (lazy loaded)
- CodeSandbox (Sandpack): ~400KB (lazy loaded)

**Total**: ~1MB (solo se carga cuando se necesita)

### Optimizaciones

1. **Lazy Loading**: Todos los componentes pesados se cargan dinámicamente
2. **Code Splitting**: Monaco y Sandpack se cargan solo cuando se abren
3. **Stagger Animations**: Animaciones escalonadas para mejor UX
4. **Intersection Observer**: Animaciones solo cuando son visibles
5. **Memoization**: Componentes memoizados para evitar re-renders

---

## Integración en Homepage

La sección está integrada en `app/page.tsx`:

```tsx
<motion.section
  id="tech-stack"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  <TechShowcaseSection />
</motion.section>
```

**Posición**: Después de AI Showcase, antes de Logistics Tracker

---

## Personalización

### Agregar nueva tecnología

Editar `data/technologies.json`:

```json
{
  "id": "nueva-tech",
  "name": "Nueva Tech",
  "icon": "🚀",
  "category": "frontend",
  "expertiseLevel": 4,
  "projectCount": 10,
  "description": "Descripción de la tecnología",
  "demoCode": {
    "language": "javascript",
    "code": "console.log('Demo')",
    "description": "Demo básico"
  }
}
```

### Cambiar colores por categoría

Editar `tech-stack-grid.tsx`:

```typescript
const categoryColors = {
  frontend: 'bg-neon-blue/20 text-neon-blue border-neon-blue',
  backend: 'bg-neon-purple/20 text-neon-purple border-neon-purple',
  // ...
}
```

### Personalizar animaciones

Editar velocidades y delays en los componentes:

```typescript
// Más rápido
delay: index * 0.03

// Más lento
delay: index * 0.1
```

---

## Troubleshooting

### Monaco Editor no carga

**Problema**: Editor muestra loading infinito

**Solución**: Verificar que `@monaco-editor/react` esté instalado:
```bash
npm install @monaco-editor/react --legacy-peer-deps
```

### Sandpack no ejecuta código

**Problema**: Preview muestra error

**Solución**: Verificar template y archivos:
```typescript
// Usar template correcto
template: 'react' // para JSX
template: 'react-ts' // para TypeScript
```

### Animaciones lentas

**Problema**: Animaciones se ven entrecortadas

**Solución**: Reducir cantidad de partículas o deshabilitar efectos 3D en dispositivos lentos

---

## Próximas Mejoras

- [ ] Agregar más lenguajes (Go, Rust, etc.)
- [ ] Integrar con portfolio (mostrar proyectos por tech)
- [ ] Agregar tests unitarios
- [ ] Mejorar performance en móviles
- [ ] Agregar modo de comparación (comparar 2 techs)
- [ ] Integrar con GitHub (mostrar repos)

---

## Referencias

- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Sandpack](https://sandpack.codesandbox.io/)
- [GSAP](https://greensock.com/docs/)
- [Framer Motion](https://www.framer.com/motion/)
