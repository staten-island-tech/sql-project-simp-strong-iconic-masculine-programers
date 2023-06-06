import { supabase } from '@supabase/supabase-js'

const supabaseUrl = 'https://pwvrphowendnbjrujflh.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dnJwaG93ZW5kbmJqcnVqZmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYwNzEwMzQsImV4cCI6MjAwMTY0NzAzNH0.C3o6UhE-LVdA5eVJiWZ1SbepsQfhSf1amwmvfaoMJUY'
export const supabase = createClient(supabaseUrl, supabaseKey)
