"use client"

import React, { useState } from 'react'
import { OptimizedAnimation, OptimizedParticles, FrameRateAwareAnimation, CSSOptimizedAnimation } from '@/components/ui/optimized-animation'
import { useAnimationPerformance } from '@/hooks/use-animation-performance'
import { Button } from '@/components/ui/button'

export function AnimationPerformanceDemo() {
  const [showDemo, setShowDemo] = useState(false)
  const { metrics, settings, prefersReducedMotion, startMonitoring, stopMonitoring } = useAnimationPerformance()

  const handleStartDemo = () => {
    setShowDemo(true)
    startMonitoring()
  }

  const handleStopDemo = () => {
    setShowDemo(false)
    stopMonitoring()
  }

  return (
    <div className="p-8 bg-gorilla-black text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gorilla-yellow">
          Animation Performance Demo
        </h1>
        
        {/* Performance Metrics */}
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-400">Current FPS</div>
              <div className="text-2xl font-bold text-gorilla-yellow">{metrics.fps}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Average FPS</div>
              <div className="text-2xl font-bold text-gorilla-yellow">{metrics.averageFPS}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Quality</div>
              <div className={`text-2xl font-bold ${
                metrics.quality === 'high' ? 'text-green-400' :
                metrics.quality === 'medium' ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {metrics.quality.toUpperCase()}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Reduced Motion</div>
              <div className={`text-2xl font-bold ${prefersReducedMotion ? 'text-red-400' : 'text-green-400'}`}>
                {prefersReducedMotion ? 'ON' : 'OFF'}
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Current Settings</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-400">Duration</div>
              <div className="text-lg font-semibold">{settings.duration}ms</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Particle Count</div>
              <div className="text-lg font-semibold">{settings.particleCount}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Complex Effects</div>
              <div className={`text-lg font-semibold ${settings.enableComplexEffects ? 'text-green-400' : 'text-red-400'}`}>
                {settings.enableComplexEffects ? 'ON' : 'OFF'}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400">GPU Acceleration</div>
              <div className={`text-lg font-semibold ${settings.useGPUAcceleration ? 'text-green-400' : 'text-red-400'}`}>
                {settings.useGPUAcceleration ? 'ON' : 'OFF'}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-8">
          <Button 
            onClick={handleStartDemo}
            disabled={showDemo}
            className="bg-gorilla-yellow text-gorilla-black hover:bg-yellow-400"
          >
            Start Performance Demo
          </Button>
          <Button 
            onClick={handleStopDemo}
            disabled={!showDemo}
            variant="outline"
            className="border-gorilla-yellow text-gorilla-yellow hover:bg-gorilla-yellow hover:text-gorilla-black"
          >
            Stop Demo
          </Button>
        </div>

        {/* Demo Content */}
        {showDemo && (
          <div className="space-y-8">
            {/* Optimized Animation Examples */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Optimized Animations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <OptimizedAnimation animationType="fade" trigger="immediate">
                  <div className="bg-gorilla-yellow text-gorilla-black p-4 rounded text-center font-semibold">
                    Fade In
                  </div>
                </OptimizedAnimation>
                
                <OptimizedAnimation animationType="slide" trigger="immediate" delay={200}>
                  <div className="bg-blue-500 text-white p-4 rounded text-center font-semibold">
                    Slide Up
                  </div>
                </OptimizedAnimation>
                
                <OptimizedAnimation animationType="scale" trigger="immediate" delay={400}>
                  <div className="bg-green-500 text-white p-4 rounded text-center font-semibold">
                    Scale In
                  </div>
                </OptimizedAnimation>
                
                <OptimizedAnimation animationType="bounce" trigger="immediate" delay={600}>
                  <div className="bg-purple-500 text-white p-4 rounded text-center font-semibold">
                    Bounce In
                  </div>
                </OptimizedAnimation>
              </div>
            </div>

            {/* CSS-Only Animations */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">CSS-Only Animations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <CSSOptimizedAnimation type="fadeIn">
                  <div className="bg-red-500 text-white p-4 rounded text-center font-semibold">
                    CSS Fade
                  </div>
                </CSSOptimizedAnimation>
                
                <CSSOptimizedAnimation type="slideUp">
                  <div className="bg-orange-500 text-white p-4 rounded text-center font-semibold">
                    CSS Slide
                  </div>
                </CSSOptimizedAnimation>
                
                <CSSOptimizedAnimation type="scaleIn">
                  <div className="bg-pink-500 text-white p-4 rounded text-center font-semibold">
                    CSS Scale
                  </div>
                </CSSOptimizedAnimation>
                
                <CSSOptimizedAnimation type="rotateIn">
                  <div className="bg-indigo-500 text-white p-4 rounded text-center font-semibold">
                    CSS Rotate
                  </div>
                </CSSOptimizedAnimation>
              </div>
            </div>

            {/* Particle System */}
            <div className="bg-gray-900 p-6 rounded-lg relative overflow-hidden" style={{ minHeight: '300px' }}>
              <h3 className="text-lg font-semibold mb-4 relative z-10">Optimized Particle System</h3>
              <p className="text-gray-400 relative z-10">
                Particle count and complexity automatically adjust based on performance.
                Current count: {settings.particleCount}
              </p>
              
              <OptimizedParticles 
                count={settings.particleCount}
                size={3}
                speed={1}
                color="#FFD700"
              />
            </div>

            {/* Frame Rate Aware Animation */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Frame Rate Aware Animation</h3>
              <FrameRateAwareAnimation
                targetFPS={30}
                fallbackContent={
                  <div className="bg-gray-700 p-4 rounded text-center">
                    <p>Performance too low - showing static content</p>
                  </div>
                }
              >
                <div className="bg-gradient-to-r from-gorilla-yellow to-yellow-400 text-gorilla-black p-4 rounded text-center font-semibold animate-optimized-pulse">
                  High Performance Animation
                </div>
              </FrameRateAwareAnimation>
            </div>

            {/* Performance Tips */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Performance Optimizations Applied</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Using CSS transforms instead of changing layout properties
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Managing will-change property efficiently
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Frame rate monitoring and automatic quality adjustment
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Respecting prefers-reduced-motion user preference
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  GPU acceleration with translate3d() transforms
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Performance-based particle count adjustment
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}