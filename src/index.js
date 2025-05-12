import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '@/Globals/GlobalStyles';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <GlobalStyles>
        <App />
      </GlobalStyles>
  </BrowserRouter>
);

reportWebVitals();
