import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import MainCalendar from './MainCalendar';
import MealSelectPage from './MealSelectPage';
import CompletionPage from './CompletionPage';
import AdminPage from './AdminPage';
import UserManagement from './UserManagement';
import NavigationBar from './NavigationBar';
import NotFound from './NotFound';
import { testDatabaseConnection } from './supabaseClient';

function App() {
  const [dbReady, setDbReady] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;

    const initDatabase = async () => {
      try {
        const isConnected = await testDatabaseConnection();
        if (isConnected) {
          setDbReady(true);
        } else if (retryCount < maxRetries) {
          retryCount++;
          console.log(`Retrying connection... (${retryCount}/${maxRetries})`);
          setTimeout(initDatabase, 2000); // 2초 후 재시도
        } else {
          setConnectionError('데이터베이스 연결에 실패했습니다. 페이지를 새로고침 해주세요.');
        }
      } catch (error) {
        console.error('Database initialization error:', error);
        setConnectionError('데이터베이스 연결 중 오류가 발생했습니다.');
      }
    };

    initDatabase();
  }, []);

  if (connectionError) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        marginTop: '50px' 
      }}>
        <h2>연결 오류</h2>
        <p>{connectionError}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            marginTop: '20px',
            cursor: 'pointer'
          }}
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!dbReady) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        marginTop: '50px' 
      }}>
        <h2>데이터베이스 연결 중...</h2>
        <p>잠시만 기다려주세요...</p>
      </div>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<MainCalendar />} />
          <Route path="/meal-select" element={<MealSelectPage />} />
          <Route path="/completion" element={<CompletionPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App; 