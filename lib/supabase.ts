import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions for database tables
export interface WrittenContentDB {
  id: string
  title: string
  summary: string
  link: string
  image_url: string
  date_added: string
  created_at: string
}

export interface WrittenContentInput {
  title: string
  summary: string
  link: string
  image_url: string
  date_added: string
}
