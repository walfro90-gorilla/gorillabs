# Gorilla Labs Design System

Este directorio contiene el sistema de diseño completo para la homepage de Gorilla Labs.

## Archivos

### `design-tokens.css`
Contiene todas las variables CSS (custom properties) que definen el sistema de diseño:

- **Colores de marca**: Gorilla Black (#000000) y Gorilla Yellow (#FFD700)
- **Colores neón**: Blue, Purple, Pink (WCAG AA compliant)
- **Glassmorphism**: Variables para efectos de vidrio esmerilado
- **Colores semánticos**: Success, Warning, Error, Info
- **Tipografía**: Escalas fluidas que se adaptan de móvil a desktop
- **Espaciado**: Sistema basado en 8px
- **Sombras**: 5 niveles de elevación + efectos de glow
- **Animaciones**: Duraciones y funciones de easing
- **Z-index**: Escala consistente para capas

## Uso

### Colores

```tsx
// Usando clases de Tailwind
<div className="bg-gorilla-black text-gorilla-yellow">
  <span className="text-neon-blue">Texto neón</span>
</div>

// Usando CSS custom properties
<div style={{ color: 'var(--neon-purple)' }}>
  Texto púrpura neón
</div>
```

### Glassmorphism

```tsx
// Efecto de vidrio básico
<div className="glass rounded-lg p-6">
  Contenido con efecto glassmorphism
</div>

// Con hover effect
<div className="glass glass-hover rounded-lg p-6">
  Contenido con efecto glassmorphism y hover
</div>
```

### Tipografía

```tsx
// Tamaños fluidos que escalan automáticamente
<h1 className="text-5xl font-bold">Título principal</h1>
<p className="text-base leading-normal">Texto de párrafo</p>
<code className="font-code text-sm">const code = true;</code>
```

### Espaciado

```tsx
// Usando el sistema de espaciado
<div className="p-xl mb-2xl">
  <div className="space-y-md">
    <p>Párrafo 1</p>
    <p>Párrafo 2</p>
  </div>
</div>
```

### Sombras y Glow

```tsx
// Sombras de elevación
<div className="shadow-lg">Tarjeta con sombra</div>

// Efectos de glow
<button className="shadow-glow-blue">Botón con glow azul</button>
<div className="glow-purple">Elemento con glow púrpura</div>
```

### Animaciones

```tsx
// Animaciones predefinidas
<div className="animate-fade-in">Aparece con fade</div>
<div className="animate-slide-up">Sube desde abajo</div>
<div className="animate-glow">Efecto de glow pulsante</div>

// Timing personalizado
<div className="transition-all duration-normal ease-out">
  Transición suave
</div>
```

### Z-Index

```tsx
// Usando la escala de z-index
<div className="z-modal">Modal</div>
<div className="z-tooltip">Tooltip</div>
<div className="z-dropdown">Dropdown</div>
```

## Responsive Design

El sistema usa un enfoque mobile-first con breakpoints:

- **Base**: 320px - 639px (móvil)
- **sm**: 640px - 767px (tablet pequeña)
- **md**: 768px - 1023px (tablet)
- **lg**: 1024px - 1279px (laptop pequeña)
- **xl**: 1280px - 1535px (desktop)
- **2xl**: 1536px+ (desktop grande)

```tsx
// Ejemplo responsive
<div className="text-base md:text-lg xl:text-xl">
  Texto que escala con el viewport
</div>

<div className="p-sm md:p-md lg:p-xl">
  Padding que aumenta en pantallas más grandes
</div>
```

## Accesibilidad

### Contraste de colores
Todos los colores cumplen con WCAG AA:
- Texto normal: mínimo 4.5:1
- Texto grande: mínimo 3:1
- Componentes UI: mínimo 3:1

### Reduced Motion
El sistema respeta `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  /* Todas las animaciones se reducen a 0.01ms */
}
```

### Touch Targets
Todos los elementos interactivos deben tener mínimo 44x44px:

```tsx
<button className="min-h-[44px] min-w-[44px]">
  Botón accesible
</button>
```

## Fuentes

### Inter (Sans-serif)
- Uso: Texto general, headings
- Variable: `--font-primary`
- Clase: `font-sans` o `font-display`

### JetBrains Mono (Monospace)
- Uso: Código, snippets técnicos
- Variable: `--font-code`
- Clase: `font-code`

```tsx
<p className="font-sans">Texto normal</p>
<code className="font-code">const code = true;</code>
```

## Mejores Prácticas

1. **Usa las variables CSS** en lugar de valores hardcoded
2. **Respeta el sistema de espaciado** (múltiplos de 8px)
3. **Usa las clases de utilidad** de Tailwind cuando sea posible
4. **Mantén la consistencia** en animaciones y transiciones
5. **Prueba en modo oscuro** y con reduced motion
6. **Verifica el contraste** de colores con herramientas de accesibilidad

## Ejemplos Completos

### Card con Glassmorphism

```tsx
<div className="glass glass-hover rounded-xl p-xl shadow-lg">
  <h3 className="text-2xl font-bold mb-md text-gorilla-yellow">
    Título de la tarjeta
  </h3>
  <p className="text-base leading-normal text-white/80">
    Contenido de la tarjeta con efecto glassmorphism
  </p>
  <button className="mt-lg px-lg py-md bg-neon-blue rounded-lg 
                     transition-all duration-normal hover:shadow-glow-blue">
    Acción
  </button>
</div>
```

### Hero Section con Efectos

```tsx
<section className="relative min-h-screen flex items-center justify-center 
                    bg-gorilla-black overflow-hidden">
  {/* Background con glow */}
  <div className="absolute inset-0 glow-purple opacity-20" />
  
  {/* Contenido */}
  <div className="relative z-10 glass rounded-2xl p-2xl max-w-4xl">
    <h1 className="text-5xl font-bold text-gorilla-yellow mb-lg 
                   animate-slide-up">
      Gorilla Labs
    </h1>
    <p className="text-xl text-white/90 leading-relaxed animate-fade-in">
      Tecnología de última generación
    </p>
  </div>
</section>
```
