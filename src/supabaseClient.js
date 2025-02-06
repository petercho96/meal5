import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project-url.supabase.co'; // 실제 프로젝트 URL로 변경
const supabaseKey = 'YOUR_ANON_KEY'; // 실제 anon 키로 변경

export const supabase = createClient(supabaseUrl, supabaseKey); 