"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EnhancedParticleBackground } from '@/components/visual-effects/enhanced-particle-background'
import { EnhancedShaderGradient } from '@/components/visual-effects/enhanced-shader-gradient'
import { LightweightParticleBackground } from '@/components/visual-effects/enhanced-particle-background'
import { AdvancedCSSGradient, SimpleCSSGradient } from '@/components/visual-effects/enhanced-shader-gradient'
import { FallbackTestPanel } from '@/components/ui/fallback-test-panel'

/**
 * Fallback Demo Component
 * Demonstrates the visual effects fallback system in action
 */
export function FallbackDemo() {
  const [activeDemo, setActiveDemo] = useState<'enhanced' | 'css' | 'simple'>('enhanced')
  const [showTestPanel, setShowTestPanel] = useState(false)

  const demoColors = ['#000000', '#FFD700', '#00D4E6']

  return (
    <div className="min-h-screen bg-gorilla-black text-gorilla-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <Card className="bg-gorilla-black/50 border-gorilla-yellow/20">
          <CardHeader>
            <CardTitle className="text-gorilla-yellow">Visual Effects Fallback Demo</CardTitle>
            <CardDescription className="text-gorilla-white/70">
              Test different fallback scenarios for visual effects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Button
                onClick={() => setActiveDemo('enhanced')}
                variant={activeDemo === 'enhanced' ? 'default' : 'outline'}
                className="bg-gorilla-yellow text-gorilla-black hover:bg-gorilla-yellow/90"
              >
                Enhanced (WebGL + Fallbacks)
              </Button>
              <Button
                onClick={() => setActiveDemo('css')}
                variant={activeDemo === 'css' ? 'default' : 'outline'}
                className="bg-gorilla-yellow text-gorilla-black hover:bg-gorilla-yellow/90"
              >
                CSS Fallbacks
              </Button>
              <Button
                onClick={() => setActiveDemo('simple')}
                variant={activeDemo === 'simple' ? 'default' : 'outline'}
                className="bg-gorilla-yellow text-gorilla-black hover:bg-gorilla-yellow/90"
              >
                Simple CSS
              </Button>
              <Button
                onClick={() => setShowTestPanel(!showTestPanel)}
                variant="outline"
                className="border-gorilla-yellow text-gorilla-yellow hover:bg-gorilla-yellow hover:text-gorilla-black"
              >
                {showTestPanel ? 'Hide' : 'Show'} Test Panel
              </Button>
            </div>
          </CardContent>
        </Card>

        {showTestPanel && (
          <Card className="bg-gorilla-black/50 border-gorilla-yellow/20">
            <CardContent className="pt-6">
              <FallbackTestPanel />
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Particle Effects Demo */}
          <Card className="bg-gorilla-black/50 border-gorilla-yellow/20 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-gorilla-yellow">Particle Effects</CardTitle>
              <CardDescription className="text-gorilla-white/70">
                {activeDemo === 'enhanced' && 'Enhanced particles with WebGL fallbacks'}
                {activeDemo === 'css' && 'CSS-based particle effects'}
                {activeDemo === 'simple' && 'Lightweight CSS particles'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 bg-gradient-to-br from-gorilla-black to-gray-900 rounded-lg overflow-hidden">
                {activeDemo === 'enhanced' && (
                  <EnhancedParticleBackground
                    count={100}
                    enableParallax={false}
                    className="absolute inset-0"
                  />
                )}
                {activeDemo === 'css' && (
                  <LightweightParticleBackground
                    count={50}
                    className="absolute inset-0"
                  />
                )}
                {activeDemo === 'simple' && (
                  <div className="absolute inset-0 bg-gradient-radial from-gorilla-yellow/10 via-transparent to-transparent animate-pulse" />
                )}
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gorilla-yellow mb-2">
                      Gorilla Labs
                    </h3>
                    <p className="text-gorilla-white/80">
                      Particle effects with proper fallbacks
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gradient Effects Demo */}
          <Card className="bg-gorilla-black/50 border-gorilla-yellow/20 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-gorilla-yellow">Gradient Effects</CardTitle>
              <CardDescription className="text-gorilla-white/70">
                {activeDemo === 'enhanced' && 'Shader gradients with CSS fallbacks'}
                {activeDemo === 'css' && 'Advanced CSS gradients'}
                {activeDemo === 'simple' && 'Simple CSS gradients'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 rounded-lg overflow-hidden">
                {activeDemo === 'enhanced' && (
                  <EnhancedShaderGradient
                    colors={demoColors}
                    animationSpeed={0.5}
                    className="absolute inset-0"
                  />
                )}
                {activeDemo === 'css' && (
                  <AdvancedCSSGradient
                    colors={demoColors}
                    animationSpeed={1}
                    className="absolute inset-0"
                  />
                )}
                {activeDemo === 'simple' && (
                  <SimpleCSSGradient
                    colors={demoColors}
                    direction="135deg"
                    className="absolute inset-0"
                  />
                )}
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-2">
                      Dynamic Gradients
                    </h3>
                    <p className="text-white/90 drop-shadow-md">
                      Shader effects with graceful degradation
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Comparison */}
        <Card className="bg-gorilla-black/50 border-gorilla-yellow/20">
          <CardHeader>
            <CardTitle className="text-gorilla-yellow">Feature Comparison</CardTitle>
            <CardDescription className="text-gorilla-white/70">
              Compare different fallback approaches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gorilla-yellow/20">
                    <th className="text-left py-2 text-gorilla-yellow">Feature</th>
                    <th className="text-center py-2 text-gorilla-yellow">Enhanced</th>
                    <th className="text-center py-2 text-gorilla-yellow">CSS Fallback</th>
                    <th className="text-center py-2 text-gorilla-yellow">Simple CSS</th>
                  </tr>
                </thead>
                <tbody className="text-gorilla-white/80">
                  <tr className="border-b border-gorilla-yellow/10">
                    <td className="py-2">WebGL Detection</td>
                    <td className="text-center py-2">✅</td>
                    <td className="text-center py-2">❌</td>
                    <td className="text-center py-2">❌</td>
                  </tr>
                  <tr className="border-b border-gorilla-yellow/10">
                    <td className="py-2">Automatic Fallback</td>
                    <td className="text-center py-2">✅</td>
                    <td className="text-center py-2">❌</td>
                    <td className="text-center py-2">❌</td>
                  </tr>
                  <tr className="border-b border-gorilla-yellow/10">
                    <td className="py-2">Performance Testing</td>
                    <td className="text-center py-2">✅</td>
                    <td className="text-center py-2">❌</td>
                    <td className="text-center py-2">❌</td>
                  </tr>
                  <tr className="border-b border-gorilla-yellow/10">
                    <td className="py-2">Accessibility Support</td>
                    <td className="text-center py-2">✅</td>
                    <td className="text-center py-2">✅</td>
                    <td className="text-center py-2">✅</td>
                  </tr>
                  <tr className="border-b border-gorilla-yellow/10">
                    <td className="py-2">Browser Compatibility</td>
                    <td className="text-center py-2">✅</td>
                    <td className="text-center py-2">✅</td>
                    <td className="text-center py-2">✅</td>
                  </tr>
                  <tr className="border-b border-gorilla-yellow/10">
                    <td className="py-2">Visual Quality</td>
                    <td className="text-center py-2">High</td>
                    <td className="text-center py-2">Medium</td>
                    <td className="text-center py-2">Basic</td>
                  </tr>
                  <tr>
                    <td className="py-2">Performance Impact</td>
                    <td className="text-center py-2">Variable</td>
                    <td className="text-center py-2">Low</td>
                    <td className="text-center py-2">Minimal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Usage Instructions */}
        <Card className="bg-gorilla-black/50 border-gorilla-yellow/20">
          <CardHeader>
            <CardTitle className="text-gorilla-yellow">Implementation Guide</CardTitle>
            <CardDescription className="text-gorilla-white/70">
              How to use the fallback system in your components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gorilla-white/80">
              <div>
                <h4 className="font-semibold text-gorilla-yellow mb-2">1. Enhanced Components (Recommended)</h4>
                <p className="text-sm mb-2">Use enhanced components for automatic WebGL detection and fallbacks:</p>
                <pre className="bg-gray-900 p-3 rounded text-xs overflow-x-auto">
{`import { EnhancedParticleBackground } from '@/components/visual-effects/enhanced-particle-background'

<EnhancedParticleBackground
  count={100}
  enableParallax={false}
  className="absolute inset-0"
/>`}
                </pre>
              </div>
              
              <div>
                <h4 className="font-semibold text-gorilla-yellow mb-2">2. Manual Fallback Control</h4>
                <p className="text-sm mb-2">Use the VisualEffectsFallback wrapper for custom components:</p>
                <pre className="bg-gray-900 p-3 rounded text-xs overflow-x-auto">
{`import { VisualEffectsFallback } from '@/components/ui/visual-effects-fallback'

<VisualEffectsFallback
  fallback={<CSSFallbackComponent />}
  testWebGL={true}
  onFallbackUsed={(reason) => console.log(reason)}
>
  <WebGLComponent />
</VisualEffectsFallback>`}
                </pre>
              </div>
              
              <div>
                <h4 className="font-semibold text-gorilla-yellow mb-2">3. Testing and Debugging</h4>
                <p className="text-sm mb-2">Use the test panel to validate fallback behavior across different scenarios.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}