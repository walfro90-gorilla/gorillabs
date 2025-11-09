'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { isWebGLAvailable } from '@/lib/three-config'

interface ShaderGradientProps {
  colors: string[]
  animationSpeed?: number
  blendMode?: 'normal' | 'multiply' | 'screen'
  className?: string
}

/**
 * Custom vertex shader
 */
const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

/**
 * Custom fragment shader for animated gradient
 */
const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uSpeed;
  
  varying vec2 vUv;
  
  // Noise function for organic movement
  float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  // Smooth noise
  float smoothNoise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  
  void main() {
    vec2 st = vUv;
    
    // Animate the gradient
    float time = uTime * uSpeed;
    
    // Create flowing pattern
    float noise1 = smoothNoise(st * 3.0 + time * 0.1);
    float noise2 = smoothNoise(st * 2.0 - time * 0.15);
    
    // Mix colors based on position and noise
    vec3 color = mix(uColor1, uColor2, st.y + noise1 * 0.3);
    color = mix(color, uColor3, st.x + noise2 * 0.3);
    
    // Add some shimmer
    float shimmer = sin(time + st.x * 10.0 + st.y * 10.0) * 0.1 + 0.9;
    color *= shimmer;
    
    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * Shader Mesh Component
 */
function ShaderMesh({ 
  colors, 
  speed 
}: { 
  colors: THREE.Color[]
  speed: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  
  useEffect(() => {
    if (!meshRef.current) return
    
    // Create shader material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: colors[0] || new THREE.Color(0x000000) },
        uColor2: { value: colors[1] || new THREE.Color(0xFFD700) },
        uColor3: { value: colors[2] || new THREE.Color(0x00D4E6) },
        uSpeed: { value: speed },
      },
    })
    
    materialRef.current = material
    meshRef.current.material = material
    
    return () => {
      material.dispose()
    }
  }, [colors, speed])
  
  // Update time uniform
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })
  
  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[10, 10, 32, 32]} />
    </mesh>
  )
}

/**
 * CSS Gradient Fallback
 */
function CSSGradientFallback({ 
  colors, 
  className 
}: { 
  colors: string[]
  className?: string 
}) {
  return (
    <div 
      className={`absolute inset-0 ${className || ''}`}
      style={{
        background: `linear-gradient(135deg, ${colors.join(', ')})`,
        animation: 'gradient-shift 10s ease infinite',
        backgroundSize: '200% 200%',
      }}
    >
      <style jsx>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  )
}

/**
 * ShaderGradient Component
 * Animated gradient using custom GLSL shaders
 */
export function ShaderGradient({
  colors,
  animationSpeed = 0.5,
  blendMode = 'normal',
  className = '',
}: ShaderGradientProps) {
  const [webGLSupported, setWebGLSupported] = useState(true)
  const [threeColors, setThreeColors] = useState<THREE.Color[]>([])
  
  useEffect(() => {
    // Check WebGL support
    const supported = isWebGLAvailable()
    setWebGLSupported(supported)
    
    if (!supported) {
      console.warn('WebGL not supported, using CSS gradient fallback')
      return
    }
    
    // Convert hex colors to Three.js colors
    const convertedColors = colors.map(color => new THREE.Color(color))
    setThreeColors(convertedColors)
  }, [colors])
  
  // Fallback to CSS gradient if WebGL not supported
  if (!webGLSupported) {
    return <CSSGradientFallback colors={colors} className={className} />
  }
  
  // Get blend mode for CSS
  const getBlendMode = () => {
    switch (blendMode) {
      case 'multiply':
        return 'multiply'
      case 'screen':
        return 'screen'
      default:
        return 'normal'
    }
  }
  
  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{ mixBlendMode: getBlendMode() }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          antialias: false, // Disable for better performance
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={1} // Lower DPR for shaders
        className="absolute inset-0"
      >
        <ShaderMesh colors={threeColors} speed={animationSpeed} />
      </Canvas>
    </div>
  )
}
