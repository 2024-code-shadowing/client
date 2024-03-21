import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './tailwind.css';
import CodeShadowingPage from './CodeShadowingPage'; // CodeShadowingPage를 import합니다.
import FullPageBackground from './Background'; // StartCodeBackground
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FullPageBackground page_type="start"/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
