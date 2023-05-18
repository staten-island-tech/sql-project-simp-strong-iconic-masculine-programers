import {createClient} from '@supabase/supabase-js'

const DatabasePW = '4AFbk6vPc97zumZ5'
const DatabaseURL = 'https://jeyrlaqsojmkebahkvcw.supabase.co'
const DatabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpleXJsYXFzb2pta2ViYWhrdmN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM3MzcxMDMsImV4cCI6MTk5OTMxMzEwM30.7dSLYsMLw_k0lqogfaopmxs3qvm4oQKoHrfP8h9M2LM'

export const supabase = createClient(DatabaseURL, DatabaseKey)