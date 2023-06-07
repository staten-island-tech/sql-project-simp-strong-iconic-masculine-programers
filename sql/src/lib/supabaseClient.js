import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://pwvrphowendnbjrujflh.supabase.co/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dnJwaG93ZW5kbmJqcnVqZmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYwNzEwMzQsImV4cCI6MjAwMTY0NzAzNH0.C3o6UhE-LVdA5eVJiWZ1SbepsQfhSf1amwmvfaoMJUY"
);
