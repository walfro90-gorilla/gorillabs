import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Some features may not work.')
}

// Cliente de Supabase para uso en el cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// Cliente de Supabase para uso en el servidor (con service role key si es necesario)
export const createServerClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (serviceRoleKey) {
    return createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  }
  
  return supabase
}

// Tipos para la base de datos
export type Database = {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          message?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          name: string
          email: string
          company: string | null
          service_interest: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          company?: string | null
          service_interest?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          company?: string | null
          service_interest?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      ai_interactions: {
        Row: {
          id: string
          user_id: string | null
          interaction_type: string
          input_text: string | null
          output_text: string | null
          metadata: Record<string, any> | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          interaction_type: string
          input_text?: string | null
          output_text?: string | null
          metadata?: Record<string, any> | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          interaction_type?: string
          input_text?: string | null
          output_text?: string | null
          metadata?: Record<string, any> | null
          created_at?: string
        }
      }
    }
  }
}

