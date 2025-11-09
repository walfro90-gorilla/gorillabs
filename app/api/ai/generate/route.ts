import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "@/lib/gemini-advanced"

export async function POST(request: NextRequest) {
  try {
    const { prompt, context, language } = await request.json()

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      )
    }

    const response = await generateText(prompt, context || "", language || "es")

    if (response.error) {
      return NextResponse.json(
        { error: response.error },
        { status: 500 }
      )
    }

    return NextResponse.json({ result: response.text })
  } catch (error) {
    console.error("Error in text generation API:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

