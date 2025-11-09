import { NextRequest, NextResponse } from 'next/server'
import { analyzeSentiment } from '@/lib/gemini-advanced'

export async function POST(request: NextRequest) {
  try {
    const { text, language } = await request.json()

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    const result = await analyzeSentiment(text, language || 'es')

    return NextResponse.json(result)
  } catch (error) {
    console.error('Sentiment analysis error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}