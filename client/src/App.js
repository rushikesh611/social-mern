import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
import { Container } from 'semantic-ui-react';
import {AuthProvider} from './context/auth';
import AuthRoute from './utils/AuthRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
            <MenuBar/>
            <Route exact path='/' component={Home}/>
            <AuthRoute exact path='/login' component={Login}/>
            <AuthRoute exact path='/Register' component={Register}/>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;


// 3:19:30 https://www.youtube.com/watch?v=n1mdAPFq2Os&list=WL&index=29w