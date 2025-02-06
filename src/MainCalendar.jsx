import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const DateButton = styled.button`
  padding: 12px 16px;
  margin: 4px;
  font-size: 16px;
  color: #1d1d1f;
  background: #f5f5f7;
  border: 1px solid #d1d1d6;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #e5e5ea;
  }
`;

const MainCalendar = () => {
  const navigate = useNavigate();

  const onDateClick = (day) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const dayStr = ('0' + day).slice(-2);
    const selectedDate = `${year}-${month}-${dayStr}`;
    navigate(`/meal-select?date=${selectedDate}`);
  };

  const renderDates = () => {
    const dates = Array.from({ length: 30 }, (_, i) => i + 1);
    return dates.map((day) => (
      <DateButton key={day} onClick={() => onDateClick(day)}>
        {day}일
      </DateButton>
    ));
  };

  return (
    <CalendarContainer>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>오늘의 식사 기록</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {renderDates()}
      </div>
    </CalendarContainer>
  );
};

export default MainCalendar; 