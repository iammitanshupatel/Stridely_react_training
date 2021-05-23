import React, { StrictMode } from 'react';
import { render } from 'react-dom';
// import Todo from 'todo';
// import { registerObserver } from 'react-perf-devtool';
import App from './App';
import './index.scss';

// registerObserver();

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
