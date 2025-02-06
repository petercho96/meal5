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

  useEffect(() => {
    const initDatabase = async () => {
      const isConnected = await testDatabaseConnection();
      setDbReady(isConnected);
    };
    initDatabase();
  }, []);

  if (!dbReady) {
    return <div>데이터베이스 연결 중...</div>;
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