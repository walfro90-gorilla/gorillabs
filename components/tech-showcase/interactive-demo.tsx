'use client'

import { useState, useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap-config'
import { GlassmorphicCard, GlassmorphicCardHeader, GlassmorphicCardContent } from '@/components/ui/glassmorphic-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, X, Maximize2, Minimize2, Copy, Check } from 'lucide-react'
import dynamic from 'next/dynamic'

const CodeEditor = dynamic(
  () => import('./code-editor').then(mod => ({ default: mod.CodeEditor })),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[250px] bg-gray-900 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gorilla-yellow" />
      </div>
    )
  }
)

const CodeSandbox = dynamic(
  () => import('./code-sandbox').then(mod => ({ default: mod.CodeSandbox })),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[300px] bg-gray-900 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gorilla-yellow" />
      </div>
    )
  }
)
import type { Technology } from './tech-stack-grid'

interface InteractiveDemoProps {
  technology: Technology
  onClose?: () => void
}

interface ExecutionResult {
  output: string
  executionTime: number
  memoryUsage?: number
  error?: string
}

/**
 * InteractiveDemo Component
 * Expandable card with code editor and execution
 */
export function InteractiveDemo({
  technology,
  onClose,
}: InteractiveDemoProps) {
  const [code, setCode] = useState(technology.demoCode?.code || '')
  const [output, setOutput] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [useSandbox, setUseSandbox] = useState(false)
  
  const cardRef = useRef<HTMLDivElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  // Entrance animation
  useEffect(() => {
    if (!cardRef.current) return

    gsap.from(cardRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: 'back.out(1.7)',
    })
  }, [])

  // Execute code (simulated)
  const handleRun = async () => {
    setIsRunning(true)
    setOutput('')
    
    const startTime = performance.now()

    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const endTime = performance.now()
      const executionTime = endTime - startTime

      // Simulated output based on language
      let simulatedOutput = ''
      
      switch (technology.demoCode?.language) {
        case 'jsx':
        case 'javascript':
          simulatedOutput = `✓ Código ejecutado exitosamente\n\nConsole output:\n${technology.name} demo running...`
          break
        case 'typescript':
          simulatedOutput = `✓ TypeScript compilado y ejecutado\n\nOutput:\n${technology.name} types validated successfully`
          break
        case 'python':
          simulatedOutput = `✓ Python script executed\n\nOutput:\n${technology.name} running on Python 3.11`
          break
        case 'html':
          simulatedOutput = `✓ HTML rendered\n\nPreview:\n[Rendered HTML content]`
          break
        default:
          simulatedOutput = `✓ Code executed successfully\n\nOutput:\n${technology.name} demo completed`
      }

      setOutput(simulatedOutput)
      setExecutionResult({
        output: simulatedOutput,
        executionTime: Math.round(executionTime),
        memoryUsage: Math.random() * 10 + 5, // Simulated
      })

      // Animate output
      if (outputRef.current) {
        gsap.from(outputRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.3,
        })
      }
    } catch (error) {
      setOutput(`❌ Error: ${error}`)
      setExecutionResult({
        output: '',
        executionTime: 0,
        error: String(error),
      })
    } finally {
      setIsRunning(false)
    }
  }

  // Copy code to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  // Toggle expanded view
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      ref={cardRef}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm ${
        isExpanded ? '' : 'md:p-8'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.()
        }
      }}
    >
      <GlassmorphicCard
        variant="strong"
        borderGlow
        glowColor="blue"
        className={`w-full transition-all duration-300 ${
          isExpanded ? 'max-w-7xl h-[90vh]' : 'max-w-4xl max-h-[85vh]'
        } overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <GlassmorphicCardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{technology.icon}</span>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {technology.name}
                </h3>
                <p className="text-sm text-white/70">
                  {technology.demoCode?.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleExpand}
                className="text-white hover:bg-white/10"
              >
                {isExpanded ? (
                  <Minimize2 className="h-5 w-5" />
                ) : (
                  <Maximize2 className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </GlassmorphicCardHeader>

        {/* Content */}
        <GlassmorphicCardContent className="flex-1 overflow-auto">
          <div className="space-y-4">
            {/* Language Badge and Mode Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-neon-blue/20 text-neon-blue border-neon-blue">
                  {technology.demoCode?.language || 'javascript'}
                </Badge>
                {/* Toggle between Editor and Sandbox */}
                {(technology.demoCode?.language === 'jsx' || 
                  technology.demoCode?.language === 'javascript' ||
                  technology.demoCode?.language === 'typescript') && (
                  <div className="flex gap-2 text-sm">
                    <button
                      onClick={() => setUseSandbox(false)}
                      className={`px-3 py-1 rounded ${
                        !useSandbox
                          ? 'bg-gorilla-yellow text-gorilla-black'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      Editor
                    </button>
                    <button
                      onClick={() => setUseSandbox(true)}
                      className={`px-3 py-1 rounded ${
                        useSandbox
                          ? 'bg-gorilla-yellow text-gorilla-black'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      Live Preview
                    </button>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="gap-2"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copiar
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="gap-2 bg-gorilla-yellow text-gorilla-black hover:bg-gorilla-yellow/90"
                >
                  <Play className="h-4 w-4" />
                  {isRunning ? 'Ejecutando...' : 'Ejecutar (Ctrl+Enter)'}
                </Button>
              </div>
            </div>

            {/* Code Editor or Sandbox */}
            <div className="rounded-lg overflow-hidden">
              {useSandbox ? (
                <CodeSandbox
                  code={code}
                  language={technology.demoCode?.language || 'javascript'}
                  onExecute={(result) => {
                    setExecutionResult(result)
                    setOutput(result.output)
                  }}
                />
              ) : (
                <CodeEditor
                  initialCode={code}
                  language={technology.demoCode?.language || 'javascript'}
                  onChange={setCode}
                  onRun={handleRun}
                  height={isExpanded ? '400px' : '250px'}
                />
              )}
            </div>

            {/* Output */}
            {output && (
              <div ref={outputRef} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-white">Output</h4>
                  {executionResult && !executionResult.error && (
                    <div className="flex gap-4 text-sm text-white/70">
                      <span>⏱️ {executionResult.executionTime}ms</span>
                      {executionResult.memoryUsage && (
                        <span>💾 {executionResult.memoryUsage.toFixed(1)}MB</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="bg-gray-900 rounded-lg p-4 font-code text-sm text-white/90 whitespace-pre-wrap">
                  {output}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-lg font-semibold text-white mb-2">
                Acerca de {technology.name}
              </h4>
              <p className="text-white/70">
                {technology.description}
              </p>
              <div className="mt-4 flex gap-4 text-sm">
                <div>
                  <span className="text-white/50">Nivel de expertise:</span>
                  <div className="flex gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < technology.expertiseLevel
                            ? 'bg-gorilla-yellow'
                            : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-white/50">Proyectos:</span>
                  <div className="text-gorilla-yellow font-semibold mt-1">
                    {technology.projectCount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassmorphicCardContent>
      </GlassmorphicCard>
    </div>
  )
}
