# Visual Effects Components

Componentes de efectos visuales avanzados para la homepage de Gorilla Labs.

## Componentes

### ParticleBackground

Sistema de partículas 3D animadas usando Three.js y React Three Fiber.

**Características:**
- ✅ 1000+ partículas animadas en 3D
- ✅ Monitoreo de FPS en tiempo real
- ✅ Ajuste adaptativo de calidad según rendimiento
- ✅ Efecto parallax en scroll
- ✅ Detección de WebGL con fallback a CSS
- ✅ Soporte para `prefers-reduced-motion`
- ✅ Optimización para móviles

**Props:**

```typescript
interface ParticleBackgroundProps {
  particleCount?: number        // Cantidad de partículas (default: auto)
  particleSize?: number          // Tamaño de partículas (default: 2)
  particleColor?: string         // Color hex (default: '#FFD700')
  animationSpeed?: number        // Velocidad (default: 0.5)
  enableParallax?: boolean       // Parallax en scroll (default: true)
  className?: string             // Clases CSS adicionales
}
```

**Uso:**

```tsx
import { ParticleBackground } from '@/components/visual-effects/particle-background'

<ParticleBackground
  particleCount={1000}
  particleColor="#FFD700"
  animationSpeed={0.5}
  enableParallax={true}
/>
```

**Performance:**
- Desktop (high): 1000 partículas @ 60 FPS
- Desktop (medium): 600 partículas @ 60 FPS
- Desktop (low): 300 partículas @ 60 FPS
- Mobile: 200 partículas @ 60 FPS

**Fallback:**
Si WebGL no está disponible, automáticamente usa un fallback CSS con 50 partículas animadas.

---

### ShaderGradient

Gradiente animado usando shaders GLSL personalizados.

**Características:**
- ✅ Shaders GLSL personalizados
- ✅ Animación fluida y orgánica
- ✅ Interpolación de 3 colores
- ✅ Efecto de shimmer
- ✅ Fallback a CSS gradient
- ✅ Modos de blend (normal, multiply, screen)

**Props:**

```typescript
interface ShaderGradientProps {
  colors: string[]               // Array de colores hex (mínimo 2)
  animationSpeed?: number        // Velocidad (default: 0.5)
  blendMode?: 'normal' | 'multiply' | 'screen'  // Modo de blend
  className?: string             // Clases CSS adicionales
}
```

**Uso:**

```tsx
import { ShaderGradient } from '@/components/visual-effects/shader-gradient'

<ShaderGradient
  colors={['#000000', '#FFD700', '#00D4E6']}
  animationSpeed={0.3}
  blendMode="screen"
  className="opacity-30"
/>
```

**Shaders:**

El componente usa shaders personalizados:
- **Vertex Shader**: Pasa coordenadas UV
- **Fragment Shader**: Crea gradiente animado con noise

**Fallback:**
Si WebGL no está disponible, usa un gradiente CSS animado con `background-position`.

---

### GlassmorphicCard

Tarjeta con efecto glassmorphism (vidrio esmerilado).

**Características:**
- ✅ Efecto backdrop-filter blur
- ✅ Borde animado con glow en hover
- ✅ 3 variantes (subtle, default, strong)
- ✅ 4 colores de glow (yellow, blue, purple, pink)
- ✅ Efecto shine en hover
- ✅ Animación de escala en hover
- ✅ Accesible (contraste WCAG AA)

**Props:**

```typescript
interface GlassmorphicCardProps {
  children: ReactNode
  blur?: number                  // Blur personalizado (px)
  opacity?: number               // Opacidad personalizada (0-1)
  borderGlow?: boolean           // Activar glow en hover
  glowColor?: 'yellow' | 'blue' | 'purple' | 'pink'
  variant?: 'default' | 'subtle' | 'strong'
  className?: string
  hover?: boolean                // Activar efectos hover
}
```

**Variantes:**

| Variant | Background | Border | Blur | Opacity |
|---------|-----------|--------|------|---------|
| subtle  | rgba(255,255,255,0.05) | rgba(255,255,255,0.1) | 8px | 0.5 |
| default | rgba(255,255,255,0.1) | rgba(255,255,255,0.2) | 12px | 0.8 |
| strong  | rgba(255,255,255,0.15) | rgba(255,255,255,0.3) | 16px | 0.9 |

**Uso:**

```tsx
import { 
  GlassmorphicCard,
  GlassmorphicCardHeader,
  GlassmorphicCardContent,
  GlassmorphicCardTitle,
  GlassmorphicCardDescription
} from '@/components/ui/glassmorphic-card'

<GlassmorphicCard 
  variant="strong" 
  borderGlow 
  glowColor="yellow"
>
  <GlassmorphicCardHeader>
    <GlassmorphicCardTitle>Título</GlassmorphicCardTitle>
    <GlassmorphicCardDescription>
      Descripción
    </GlassmorphicCardDescription>
  </GlassmorphicCardHeader>
  <GlassmorphicCardContent>
    <p>Contenido de la tarjeta</p>
  </GlassmorphicCardContent>
</GlassmorphicCard>
```

**Subcomponentes:**
- `GlassmorphicCardHeader` - Encabezado con borde inferior
- `GlassmorphicCardContent` - Contenido principal
- `GlassmorphicCardFooter` - Pie con borde superior
- `GlassmorphicCardTitle` - Título (h3)
- `GlassmorphicCardDescription` - Descripción (p)

---

## Demo

Ver `visual-effects-demo.tsx` para un ejemplo completo de todos los componentes.

```tsx
import { VisualEffectsDemo } from '@/components/visual-effects/visual-effects-demo'

<VisualEffectsDemo />
```

## Performance

### Optimizaciones Implementadas

1. **Lazy Loading**: Todos los componentes se cargan dinámicamente
2. **WebGL Detection**: Fallback automático a CSS si no hay soporte
3. **FPS Monitoring**: Ajuste automático de calidad
4. **Adaptive Quality**: Reduce partículas si FPS < 55
5. **Mobile Optimization**: Menos partículas en móviles
6. **Reduced Motion**: Respeta preferencias del usuario

### Métricas

- **ParticleBackground**: ~5-10ms por frame (60 FPS)
- **ShaderGradient**: ~2-3ms por frame (60 FPS)
- **GlassmorphicCard**: CSS puro, sin impacto en JS

### Bundle Size

- Three.js: ~600KB (lazy loaded)
- React Three Fiber: ~100KB (lazy loaded)
- React Three Drei: ~50KB (lazy loaded)
- Componentes: ~15KB

Total: ~765KB (solo se carga cuando es necesario)

## Troubleshooting

### "WebGL not supported"

**Problema**: El navegador no soporta WebGL

**Solución**: Los componentes automáticamente usan fallback CSS

### Performance bajo

**Problema**: FPS < 30

**Solución**: 
1. El AdaptiveQualityManager reduce automáticamente las partículas
2. Puedes forzar menos partículas: `particleCount={300}`

### Backdrop-filter no funciona

**Problema**: Safari antiguo no soporta backdrop-filter

**Solución**: El componente incluye `-webkit-backdrop-filter` para Safari

## Próximos Pasos

- [ ] Agregar más efectos de partículas (formas, colores)
- [ ] Crear más variantes de shaders
- [ ] Agregar animaciones de entrada/salida
- [ ] Optimizar para dispositivos de gama baja
- [ ] Agregar tests unitarios

## Referencias

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [GLSL Shaders](https://thebookofshaders.com/)
- [Glassmorphism](https://glassmorphism.com/)
