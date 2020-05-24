import React from 'react';
import {NavLink, Route} from "react-router-dom";


const Nav: React.FC = () => (
  <nav>
    <ul className="navlist">
      <li className="navlist__item">
        <NavLink
          to="/"
          exact
          className="navlist__link">
          Home
        </NavLink>
      </li>
      <li className="navlist__item">
        <NavLink
          to="/people"
          className="navlist__link">
          People Page
        </NavLink>
      </li>

      <li className="navlist__item search">
        <Route path='/people'>
        <input
          type="text"
          className='search_input'
        />
      </Route>
      </li>
    </ul>

  </nav>
);

export default Nav;
