import React from 'react';
import {Switch, Route} from 'react-router-dom';
import loadable from '@loadable/component';
import './App.css';

const HomePage = loadable(() => import('./pages/Home'));
const SigninPage = loadable(() => import('./pages/Signin'));
const SignupPage = loadable(() => import('./pages/Signup'));

function App() {
  return (
    <>
    <div>react-pure-ssr-component</div>
    <Switch>
      
        <Route exact path="/" render={() => <HomePage/>}/>
        <Route path="/signin" render={() => <SigninPage/>}/>
        <Route path="/signup" render={() => <SignupPage/>}/>
      
    </Switch>
    </>
  );
}

export default App;
