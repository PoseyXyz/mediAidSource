import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MediProvider } from './Context';
import {HashRouter as Router} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <MediProvider>
      <Router basename={"https://poseyxyz.github.io/mediAid/"}>
        <App/>
      </Router>
    </MediProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
