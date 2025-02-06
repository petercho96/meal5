import React, { useState } from 'react';
import styled from 'styled-components';

const CalendarWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const MonthYear = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #007aff;
`;

const WeekDaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 8px;
`;

const WeekDay = styled.div`
  font-weight: 600;
`;

const DatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  gap: 4px;
`;

const DateCell = styled.div`
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: #e5e5ea;
  }
  background-color: ${props => props.selected ? '#007aff' : 'transparent'};
  color: ${props => props.selected ? '#fff' : '#000'};
`;

const CalendarComponent = ({ onDateClick }) => {
  const today = new Date();
  const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = current.getFullYear();
  const month = current.getMonth(); // 0-indexed
  const monthName = current.toLocaleString('default', { month: 'long' });

  // 첫날 정보와 시작 요일 구하기
  const firstDayOfMonth = new Date(year, month, 1);
  const startingDay = firstDayOfMonth.getDay(); // 0: 일요일

  // 해당 월의 총 일수
  const totalDays = new Date(year, month + 1, 0).getDate();

  // 달력에 표시할 셀 배열 (빈 칸 + 날짜)
  const dates = [];
  for (let i = 0; i < startingDay; i++) {
    dates.push(null);
  }
  for (let d = 1; d <= totalDays; d++) {
    dates.push(d);
  }

  // 이전/다음 달 이동
  const goToPrevMonth = () => {
    setCurrent(new Date(year, month - 1, 1));
  };
  const goToNextMonth = () => {
    setCurrent(new Date(year, month + 1, 1));
  };

  // 날짜 클릭 시 (YYYY-MM-DD 포맷)
  const handleDateClick = (day) => {
    if (day) {
      const selectedDate = new Date(year, month, day);
      const formatted = selectedDate.toISOString().split('T')[0];
      onDateClick(formatted);
    }
  };

  // 오늘 날짜 판별
  const isToday = (day) => {
    const date = new Date(year, month, day);
    return date.toDateString() === today.toDateString();
  };

  return (
    <CalendarWrapper>
      <Header>
        <NavButton onClick={goToPrevMonth}>&lt;</NavButton>
        <MonthYear>{monthName} {year}</MonthYear>
        <NavButton onClick={goToNextMonth}>&gt;</NavButton>
      </Header>
      <WeekDaysContainer>
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(weekDay => (
          <WeekDay key={weekDay}>{weekDay}</WeekDay>
        ))}
      </WeekDaysContainer>
      <DatesGrid>
        {dates.map((day, index) => (
          <DateCell 
            key={index}
            onClick={() => day && handleDateClick(day)}
            selected={day && isToday(day)}
          >
            {day ? day : ''}
          </DateCell>
        ))}
      </DatesGrid>
    </CalendarWrapper>
  );
};

export default CalendarComponent; 