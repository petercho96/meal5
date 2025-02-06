import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Reset CSS */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: #f5f5f7;
    color: #1d1d1f;
    line-height: 1.6;
    font-size: 16px;
  }
  
  a {
    color: #007aff;
    text-decoration: none;
  }
`;

export default GlobalStyle; 