import { NextRequest, NextResponse } from 'next/server'
import { generateText } from '@/lib/gemini-advanced'

export async function POST(request: NextRequest) {
  try {
    const { prompt, context, language } = await request.json()

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    const result = await generateText(prompt, context || '', language || 'es')

    return NextResponse.json(result)
  } catch (error) {
    console.error('Text generation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}