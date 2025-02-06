import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CalendarComponent from './CalendarComponent';

const CalendarContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const MainCalendar = () => {
  const navigate = useNavigate();

  const handleDateSelect = (formattedDate) => {
    navigate(`/meal-select?date=${formattedDate}`);
  };

  return (
    <CalendarContainer>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>식사 기록 달력</h1>
      <CalendarComponent onDateClick={handleDateSelect} />
    </CalendarContainer>
  );
};

export default MainCalendar; 