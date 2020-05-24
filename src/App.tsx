import React from 'react';
import {
  Route, NavLink, Switch,
} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import PeoplePage from './components/PeoplePage'


const App: React.FC = () => {

  return (
    <>
      <nav>
        <ul className="navlist">
          <li className="navlist__item">
            <NavLink to="/" exact className="navlist__link">Home</NavLink>
          </li>
          <li className="navlist__item">
            <NavLink to="/people" exact className="navlist__link">People Page</NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/people"
          exact component={PeoplePage}
        />
      </Switch>

    </>
  );
};


export default App;
