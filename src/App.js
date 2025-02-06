import React from 'react';
import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';

// 스타일이 적용된 컨테이너 컴포넌트
const Container = styled.div`
  background-color: #f2f2f2;
  padding: 40px;
  text-align: center;
  height: 100vh;
`;

// 스타일이 적용된 제목 컴포넌트
const Title = styled.h1`
  color: #333;
  font-size: 2.5rem;
`;

// 스타일이 적용된 버튼 컴포넌트
const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>Styled Components 예제 프로젝트</Title>
        <p>이 프로젝트는 styled-components를 사용하여 스타일링을 구현한 예제입니다.</p>
        <Button>클릭하세요</Button>
      </Container>
    </>
  );
}

export default App; 