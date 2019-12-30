import React from 'react';
import {
  Route,
  Switch,
  NavLink,
} from 'react-router-dom';
import PeoplePage from './PeoplePage';

const Header = () => (
  <>
    <div className="header">
      <nav className="header__nav">
        <ul className="header__list">
          <li>
            <NavLink to="/" exact>Home</NavLink>
          </li>
          <li>
            <NavLink to="/people">People</NavLink>
          </li>
        </ul>
      </nav>
    </div>

    <Switch>
      <Route path="/" exact render={() => <h1>Home</h1>} />
      <Route path="/people" exact component={PeoplePage} />
      <Route render={() => <h1>Error</h1>} />
    </Switch>
  </>
);

export default Header;
