import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json()

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("contacts")
      .insert([
        {
          name,
          email,
          phone: phone || null,
          message: message || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to save contact" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error in contacts API:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

