import React from 'react';
import { Switch, Route, NavLink, useLocation, Redirect } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import './App.scss';
import 'bulma/css/bulma.css';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

const App = () => {

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
        <Route path="/home">
          <Redirect to='/' />
        </Route>
        <Route path="/people" component={PeoplePage}></Route>
        <Route path="*" component={NotFoundPage}></Route>
      </Switch>
    </div>
  )
};

export default App;
