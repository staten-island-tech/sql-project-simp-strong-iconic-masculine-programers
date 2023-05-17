import {createClient} from '@supabase/supabase-js'
// require('dotenv').config({path: 'variables.env'});
export const supabase = createClient(process.env.VUE_APP_DatabaseURL, DatabaseKey)