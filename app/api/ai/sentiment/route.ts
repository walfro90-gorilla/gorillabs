import { type NextRequest, NextResponse } from "next/server"
import { analyzeSentiment } from "@/lib/gemini-advanced"

export async function POST(request: NextRequest) {
  try {
    const { text, language } = await request.json()

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      )
    }

    const response = await analyzeSentiment(text, language || "es")

    if (response.error) {
      return NextResponse.json(
        { error: response.error },
        { status: 500 }
      )
    }

    return NextResponse.json({ result: response.text })
  } catch (error) {
    console.error("Error in sentiment analysis API:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

