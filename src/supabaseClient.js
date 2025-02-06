import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://khyxtpfzoldvskaoqllk.supabase.co'; // 실제 프로젝트 URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoeXh0cGZ6b2xkdnNrYW9xbGxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4MTc2MDQsImV4cCI6MjA1NDM5MzYwNH0.7uiW06Nc8InlAmfajD-0LU0H3lPVWMHcNysyTQH2LvI';
  
export const supabase = createClient(supabaseUrl, supabaseKey); 

// 연결 및 테이블 테스트
export const testDatabaseConnection = async () => {
  try {
    // 연결 테스트
    const { data: testData, error: testError } = await supabase
      .from('users')
      .select('count');
    
    if (testError) {
      console.error('Database connection error:', testError);
      return false;
    }
    
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Connection test failed:', error);
    return false;
  }
};

// 앱 시작 시 연결 테스트 실행
testDatabaseConnection().then(isConnected => {
  if (isConnected) {
    console.log('Ready to use database');
  } else {
    console.error('Database connection failed');
  }
});

// ※ 아래의 SQL 명령들은 JavaScript 파일 내에 작성하면 안됩니다.
// Supabase SQL Editor나 psql 클라이언트를 이용하여 데이터베이스에 직접 실행하세요.
// 
// alter table users disable row level security;
// alter table meal_records disable row level security;
//
// create policy "Allow all to read users" on users for select using (true);
// create policy "Allow all to insert users" on users for insert with check (true);
//
// create policy "Allow all to read meal_records" on meal_records for select using (true);
// create policy "Allow all to insert meal_records" on meal_records for insert with check (true);
// create policy "Allow all to update meal_records" on meal_records for update with check (true); 