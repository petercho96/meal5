import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import MainCalendar from './MainCalendar';
import MealSelectPage from './MealSelectPage';
import CompletionPage from './CompletionPage';
import MyRecordsPage from './MyRecordsPage';
import AdminPage from './AdminPage';
import NavigationBar from './NavigationBar';
import NotFound from './NotFound';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<MainCalendar />} />
          <Route path="/meal-select" element={<MealSelectPage />} />
          <Route path="/completion" element={<CompletionPage />} />
          <Route path="/my-records" element={<MyRecordsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App; 