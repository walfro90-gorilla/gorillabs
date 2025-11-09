"use client"

import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { KeyboardNavigationWrapper } from './keyboard-navigation-wrapper'
import { FocusIndicator } from './focus-indicator'

interface KeyboardNavigationTestProps {
  className?: string
}

export const KeyboardNavigationTest: React.FC<KeyboardNavigationTestProps> = ({
  className
}) => {
  const [focusedElement, setFocusedElement] = useState<string>('')
  const [keyPressed, setKeyPressed] = useState<string>('')
  const [showDebug, setShowDebug] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleFocus = (elementName: string) => {
    setFocusedElement(elementName)
  }

  const handleKeyDown = (event: React.KeyboardEvent, elementName: string) => {
    setKeyPressed(`${event.key} on ${elementName}`)
  }

  const handleEscape = () => {
    setKeyPressed('Escape pressed - focus trap released')
    if (containerRef.current) {
      containerRef.current.focus()
    }
  }

  return (
    <KeyboardNavigationWrapper
      ref={containerRef}
      className={cn('w-full max-w-2xl mx-auto', className)}
      enableArrowKeys={true}
      enableTabTrapping={false}
      enableEscapeKey={true}
      enableDebugMode={showDebug}
      onEscape={handleEscape}
      role="region"
      aria-label="Keyboard navigation test area"
    >
      <Card>
        <CardHeader>
          <CardTitle>Keyboard Navigation Test</CardTitle>
          <CardDescription>
            Test keyboard navigation with Tab, Shift+Tab, Arrow keys, Enter, and Space.
            All elements should have visible 3px yellow focus indicators.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Debug Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDebug(!showDebug)}
              onFocus={() => handleFocus('Debug Toggle')}
            >
              {showDebug ? 'Hide' : 'Show'} Debug Mode
            </Button>
            {showDebug && (
              <span className="text-sm text-muted-foreground">
                Press Ctrl+Shift+T to toggle debug overlay
              </span>
            )}
          </div>

          {/* Status Display */}
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm">
              <strong>Currently focused:</strong> {focusedElement || 'None'}
            </p>
            <p className="text-sm">
              <strong>Last key pressed:</strong> {keyPressed || 'None'}
            </p>
          </div>

          {/* Interactive Elements */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="test-input">Test Input Field</Label>
              <Input
                id="test-input"
                placeholder="Type here and use Tab to navigate"
                onFocus={() => handleFocus('Input Field')}
                onKeyDown={(e) => handleKeyDown(e, 'Input Field')}
              />
            </div>

            <div className="flex gap-4 flex-wrap">
              <FocusIndicator variant="default" color="yellow">
                <Button
                  variant="default"
                  onFocus={() => handleFocus('Primary Button')}
                  onKeyDown={(e) => handleKeyDown(e, 'Primary Button')}
                  onClick={() => alert('Primary button clicked!')}
                >
                  Primary Button
                </Button>
              </FocusIndicator>
              
              <FocusIndicator variant="default" color="yellow">
                <Button
                  variant="secondary"
                  onFocus={() => handleFocus('Secondary Button')}
                  onKeyDown={(e) => handleKeyDown(e, 'Secondary Button')}
                  onClick={() => alert('Secondary button clicked!')}
                >
                  Secondary Button
                </Button>
              </FocusIndicator>
              
              <FocusIndicator variant="strong" color="yellow">
                <Button
                  variant="outline"
                  onFocus={() => handleFocus('Outline Button')}
                  onKeyDown={(e) => handleKeyDown(e, 'Outline Button')}
                  onClick={() => alert('Outline button clicked!')}
                >
                  Outline Button
                </Button>
              </FocusIndicator>
            </div>

            <div className="space-y-2">
              <Label>Custom Focusable Elements</Label>
              <div className="flex gap-4 flex-wrap">
                <FocusIndicator variant="default" color="yellow">
                  <div
                    tabIndex={0}
                    className="p-3 border rounded-md cursor-pointer hover:bg-muted touch-target"
                    onFocus={() => handleFocus('Custom Div 1')}
                    onKeyDown={(e) => {
                      handleKeyDown(e, 'Custom Div 1')
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        alert('Custom div 1 activated!')
                      }
                    }}
                    onClick={() => alert('Custom div 1 activated!')}
                    role="button"
                    aria-label="Custom focusable div 1"
                  >
                    Custom Div 1
                  </div>
                </FocusIndicator>
                
                <FocusIndicator variant="default" color="yellow">
                  <div
                    tabIndex={0}
                    className="p-3 border rounded-md cursor-pointer hover:bg-muted touch-target"
                    onFocus={() => handleFocus('Custom Div 2')}
                    onKeyDown={(e) => {
                      handleKeyDown(e, 'Custom Div 2')
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        alert('Custom div 2 activated!')
                      }
                    }}
                    onClick={() => alert('Custom div 2 activated!')}
                    role="button"
                    aria-label="Custom focusable div 2"
                  >
                    Custom Div 2
                  </div>
                </FocusIndicator>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Links</Label>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="#test1"
                  className="text-primary underline hover:no-underline touch-target"
                  onFocus={() => handleFocus('Link 1')}
                  onKeyDown={(e) => handleKeyDown(e, 'Link 1')}
                  onClick={(e) => {
                    e.preventDefault()
                    alert('Link 1 clicked!')
                  }}
                >
                  Test Link 1
                </a>
                
                <a
                  href="#test2"
                  className="text-primary underline hover:no-underline touch-target"
                  onFocus={() => handleFocus('Link 2')}
                  onKeyDown={(e) => handleKeyDown(e, 'Link 2')}
                  onClick={(e) => {
                    e.preventDefault()
                    alert('Link 2 clicked!')
                  }}
                >
                  Test Link 2
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="test-select">Select Dropdown</Label>
              <select
                id="test-select"
                className="w-full p-2 border rounded-md touch-target"
                onFocus={() => handleFocus('Select Dropdown')}
                onKeyDown={(e) => handleKeyDown(e, 'Select Dropdown')}
              >
                <option value="">Choose an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="test-textarea">Textarea</Label>
              <textarea
                id="test-textarea"
                className="w-full p-2 border rounded-md"
                rows={3}
                placeholder="Type here..."
                onFocus={() => handleFocus('Textarea')}
                onKeyDown={(e) => handleKeyDown(e, 'Textarea')}
              />
            </div>

            {/* Tab Trapping Test */}
            <div className="space-y-2">
              <Label>Tab Trapping Test</Label>
              <KeyboardNavigationWrapper
                enableTabTrapping={true}
                className="p-4 border-2 border-dashed border-muted-foreground rounded-lg"
                role="group"
                aria-label="Tab trap test area"
              >
                <p className="text-sm mb-3">
                  This area has tab trapping enabled. Tab and Shift+Tab will cycle within this box.
                  Press Escape to exit.
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onFocus={() => handleFocus('Trapped Button 1')}
                    onClick={() => alert('Trapped button 1')}
                  >
                    Button 1
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onFocus={() => handleFocus('Trapped Button 2')}
                    onClick={() => alert('Trapped button 2')}
                  >
                    Button 2
                  </Button>
                  <Input
                    placeholder="Trapped input"
                    className="w-32"
                    onFocus={() => handleFocus('Trapped Input')}
                  />
                </div>
              </KeyboardNavigationWrapper>
            </div>
          </div>

          {/* Instructions */}
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <h3 className="font-semibold mb-2">Keyboard Navigation Instructions:</h3>
            <ul className="text-sm space-y-1">
              <li><kbd className="px-2 py-1 bg-muted rounded">Tab</kbd> - Move to next element</li>
              <li><kbd className="px-2 py-1 bg-muted rounded">Shift + Tab</kbd> - Move to previous element</li>
              <li><kbd className="px-2 py-1 bg-muted rounded">Enter</kbd> - Activate buttons and links</li>
              <li><kbd className="px-2 py-1 bg-muted rounded">Space</kbd> - Activate buttons</li>
              <li><kbd className="px-2 py-1 bg-muted rounded">Arrow Keys</kbd> - Navigate within components</li>
              <li><kbd className="px-2 py-1 bg-muted rounded">Escape</kbd> - Exit tab traps</li>
              <li><kbd className="px-2 py-1 bg-muted rounded">Ctrl + Shift + T</kbd> - Toggle debug mode</li>
            </ul>
            <p className="text-sm mt-2 text-muted-foreground">
              All focusable elements should show a 3px yellow outline when focused.
            </p>
          </div>
        </CardContent>
      </Card>
    </KeyboardNavigationWrapper>
  )
}

export default KeyboardNavigationTest