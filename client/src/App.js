import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
import { Container } from 'semantic-ui-react'

function App() {
  return (
    <Router>
     <Container>
        <MenuBar/>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/Register' component={Register}/>
     </Container>
    </Router>
  );
}

export default App;


// 2:23:40 https://www.youtube.com/watch?v=n1mdAPFq2Os&list=WL&index=29w