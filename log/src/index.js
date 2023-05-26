import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from './Context';
import { Login } from './Login/Login';
import { Register } from './Register/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider>
    <Router>
      <Routes>
        <Route exact path='/' element={<App/>} />
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/register' element={<Register />}/>
      </Routes>
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals