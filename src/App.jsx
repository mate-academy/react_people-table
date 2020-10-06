import React from 'react';
import {Switch, Route, Link, NavLink, useRouteMatch, useLocation, Redirect} from 'react-router-dom';
import {HomePage} from './components/HomePage/HomePage';
import {PeoplePage} from './components/PeoplePage/PeoplePage';
import './App.scss';
import 'bulma/css/bulma.css';

const App = () => {
  if (useLocation().pathname === '/home') {
    return <Redirect to="/" />
  }
  return (
  <div className="App">
    <nav className="navbar">
      <ul className="navbar-brand">
        <li><NavLink to="/" activeClassName="nav__link_active" className="navbar-item"><h1>Home Page</h1></NavLink></li>
        <li><NavLink to="/people" activeClassName="nav__link_active" className="navbar-item"><h1>People Page</h1></NavLink></li>
      </ul>
    </nav>
        
    <Switch>
      <Route path="/" exact component={HomePage}></Route>
      <Route path="/people"  component={PeoplePage}></Route>
    </Switch>
  </div>
)
  };

export default App;
