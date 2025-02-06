import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavBarContainer = styled.nav`
  background-color: #fff;
  padding: 16px 32px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 24px;
`;

const StyledLink = styled(NavLink)`
  font-size: 16px;
  font-weight: 500;
  color: #1d1d1f;
  text-decoration: none;
  &:hover {
    color: #007aff;
  }
  &.active {
    border-bottom: 2px solid #007aff;
  }
`;

const NavigationBar = () => {
  return (
    <NavBarContainer>
      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>식사 확인 App</div>
      <NavLinks>
        <StyledLink to="/">홈</StyledLink>
        <StyledLink to="/my-records">내 기록</StyledLink>
        <StyledLink to="/admin">관리자</StyledLink>
      </NavLinks>
    </NavBarContainer>
  );
};

export default NavigationBar; 