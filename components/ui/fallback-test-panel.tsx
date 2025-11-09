"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  runComprehensiveTestSuite, 
  testFallbackScenarios, 
  generateFallbackTestReport,
  type ComprehensiveTestSuite,
  type FallbackTestResult 
} from '@/lib/fallback-testing'
import { 
  getCachedCompatibilityReport 
} from '@/lib/browser-compatibility'
import { 
  getCachedWebGLCapabilities 
} from '@/lib/webgl-detection'

interface FallbackTestPanelProps {
  className?: string
}

/**
 * Fallback Test Panel Component
 * Provides comprehensive testing interface for visual effects fallbacks
 */
export function FallbackTestPanel({ className = '' }: FallbackTestPanelProps) {
  const [testResults, setTestResults] = useState<ComprehensiveTestSuite | null>(null)
  const [scenarioResults, setScenarioResults] = useState<any[] | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [compatibilityReport, setCompatibilityReport] = useState<any>(null)
  const [webglCapabilities, setWebglCapabilities] = useState<any>(null)

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [compat, webgl] = await Promise.all([
          getCachedCompatibilityReport(),
          Promise.resolve(getCachedWebGLCapabilities())
        ])
        setCompatibilityReport(compat)
        setWebglCapabilities(webgl)
      } catch (error) {
        console.error('Failed to load initial data:', error)
      }
    }
    loadInitialData()
  }, [])

  const runTests = async () => {
    setIsRunning(true)
    try {
      const [comprehensive, scenarios] = await Promise.all([
        runComprehensiveTestSuite(),
        testFallbackScenarios()
      ])
      setTestResults(comprehensive)
      setScenarioResults(scenarios)
    } catch (error) {
      console.error('Test execution failed:', error)
    } finally {
      setIsRunning(false)
    }
  }

  const generateReport = async () => {
    try {
      const report = await generateFallbackTestReport()
      const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `fallback-test-report-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to generate report:', error)
    }
  }

  const getStatusBadge = (result: FallbackTestResult) => {
    if (!result.passed) {
      return <Badge variant="destructive">Failed</Badge>
    }
    
    switch (result.recommendation) {
      case 'webgl':
        return <Badge variant="default" className="bg-green-600">WebGL</Badge>
      case 'css':
        return <Badge variant="secondary">CSS Fallback</Badge>
      case 'disabled':
        return <Badge variant="outline">Disabled</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getOverallStatusBadge = (recommendation: string) => {
    switch (recommendation) {
      case 'webgl':
        return <Badge variant="default" className="bg-green-600 text-white">WebGL Recommended</Badge>
      case 'css':
        return <Badge variant="secondary">CSS Fallback Recommended</Badge>
      case 'disabled':
        return <Badge variant="destructive">Effects Disabled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle>Visual Effects Fallback Testing</CardTitle>
          <CardDescription>
            Comprehensive testing suite for WebGL support and fallback behavior
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Button 
              onClick={runTests} 
              disabled={isRunning}
              className="bg-gorilla-yellow text-gorilla-black hover:bg-gorilla-yellow/90"
            >
              {isRunning ? 'Running Tests...' : 'Run Fallback Tests'}
            </Button>
            <Button 
              onClick={generateReport} 
              variant="outline"
              disabled={!testResults}
            >
              Generate Report
            </Button>
          </div>

          {testResults && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold">Overall Recommendation:</h3>
                {getOverallStatusBadge(testResults.overallRecommendation)}
              </div>
              {testResults.fallbackReason && (
                <p className="text-sm text-muted-foreground mb-4">
                  Reason: {testResults.fallbackReason}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="tests" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tests">Test Results</TabsTrigger>
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
          <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="space-y-4">
          {testResults ? (
            <div className="grid gap-4">
              {Object.entries(testResults)
                .filter(([key]) => !['overallRecommendation', 'fallbackReason'].includes(key))
                .map(([key, result]) => (
                  <Card key={key}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{(result as FallbackTestResult).testName}</CardTitle>
                        {getStatusBadge(result as FallbackTestResult)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Recommendation:</span>
                          <span className="font-medium">{(result as FallbackTestResult).recommendation}</span>
                        </div>
                        {(result as FallbackTestResult).reason && (
                          <div className="flex justify-between text-sm">
                            <span>Reason:</span>
                            <span className="text-muted-foreground">{(result as FallbackTestResult).reason}</span>
                          </div>
                        )}
                        {(result as FallbackTestResult).performance && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>FPS:</span>
                              <span className="font-medium">{(result as FallbackTestResult).performance!.fps}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Stable:</span>
                              <span className="font-medium">
                                {(result as FallbackTestResult).performance!.stable ? 'Yes' : 'No'}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Run tests to see detailed results
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          {scenarioResults ? (
            <div className="grid gap-4">
              {scenarioResults.map((scenario, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{scenario.scenario}</CardTitle>
                      {getStatusBadge(scenario.result)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Recommendation:</span>
                        <span className="font-medium">{scenario.result.recommendation}</span>
                      </div>
                      {scenario.result.reason && (
                        <div className="flex justify-between text-sm">
                          <span>Reason:</span>
                          <span className="text-muted-foreground">{scenario.result.reason}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Run tests to see scenario results
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="capabilities" className="space-y-4">
          {webglCapabilities ? (
            <Card>
              <CardHeader>
                <CardTitle>WebGL Capabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Supported:</span>
                      <Badge variant={webglCapabilities.supported ? "default" : "destructive"}>
                        {webglCapabilities.supported ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Version:</span>
                      <span className="font-medium">{webglCapabilities.version || 'None'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Performance:</span>
                      <Badge variant={
                        webglCapabilities.performanceLevel === 'high' ? 'default' :
                        webglCapabilities.performanceLevel === 'medium' ? 'secondary' : 'outline'
                      }>
                        {webglCapabilities.performanceLevel}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Max Texture Size:</span>
                      <span className="font-medium">{webglCapabilities.maxTextureSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vertex Attributes:</span>
                      <span className="font-medium">{webglCapabilities.maxVertexAttributes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Extensions:</span>
                      <span className="font-medium">{webglCapabilities.extensions?.length || 0}</span>
                    </div>
                  </div>
                </div>
                {webglCapabilities.renderer && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="text-sm">
                      <div className="font-medium mb-1">Renderer:</div>
                      <div className="text-muted-foreground break-all">{webglCapabilities.renderer}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Loading capabilities...
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="compatibility" className="space-y-4">
          {compatibilityReport ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Browser Capabilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {Object.entries(compatibilityReport.capabilities).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <Badge variant={value ? "default" : "outline"}>
                          {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {Object.entries(compatibilityReport.metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="font-medium">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {compatibilityReport.performanceTest && (
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Test Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span>FPS:</span>
                        <span className="font-medium">{compatibilityReport.performanceTest.fps}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Frame Time:</span>
                        <span className="font-medium">{compatibilityReport.performanceTest.frameTime}ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Stable:</span>
                        <Badge variant={compatibilityReport.performanceTest.stable ? "default" : "outline"}>
                          {compatibilityReport.performanceTest.stable ? 'Yes' : 'No'}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Recommendation:</span>
                        <Badge variant={
                          compatibilityReport.performanceTest.recommendation === 'high' ? 'default' :
                          compatibilityReport.performanceTest.recommendation === 'medium' ? 'secondary' : 'outline'
                        }>
                          {compatibilityReport.performanceTest.recommendation}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Loading compatibility report...
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}