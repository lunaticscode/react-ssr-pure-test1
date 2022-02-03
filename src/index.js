import React from 'react';
//import ReactDOM from 'react-dom';
import {hydrate} from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {loadableReady} from '@loadable/component'
import {BrowserRouter as Router} from 'react-router-dom';
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

loadableReady(() => {
  const rootElement = document.getElementById("root");
  hydrate( 
    
    <Router>
      <App/>
    </Router>
    
  , 
  rootElement 
  )
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
