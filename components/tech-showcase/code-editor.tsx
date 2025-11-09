'use client'

import { useRef } from 'react'
import Editor, { Monaco } from '@monaco-editor/react'

interface CodeEditorProps {
  initialCode: string
  language: string
  onChange: (code: string) => void
  onRun: () => void
  readOnly?: boolean
  theme?: 'light' | 'dark'
  height?: string
}

/**
 * CodeEditor Component
 * Monaco Editor integration for live code editing
 */
export function CodeEditor({
  initialCode,
  language,
  onChange,
  onRun,
  readOnly = false,
  theme = 'dark',
  height = '300px',
}: CodeEditorProps) {
  const editorRef = useRef<any>(null)
  const monacoRef = useRef<Monaco | null>(null)

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor
    monacoRef.current = monaco

    // Add keyboard shortcut for running code (Ctrl/Cmd + Enter)
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      () => {
        onRun()
      }
    )

    // Focus editor
    editor.focus()
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value)
    }
  }

  // Monaco editor options
  const options: any = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on',
    roundedSelection: true,
    scrollBeyondLastLine: false,
    readOnly,
    automaticLayout: true,
    tabSize: 2,
    wordWrap: 'on',
    fontFamily: 'JetBrains Mono, Fira Code, monospace',
    fontLigatures: true,
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: 'on',
    smoothScrolling: true,
    padding: { top: 16, bottom: 16 },
  }

  return (
    <div className="relative w-full rounded-lg overflow-hidden border border-white/10">
      <Editor
        height={height}
        defaultLanguage={language}
        defaultValue={initialCode}
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        options={options}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        loading={
          <div className="flex items-center justify-center h-full bg-gray-900">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gorilla-yellow" />
          </div>
        }
      />
    </div>
  )
}
