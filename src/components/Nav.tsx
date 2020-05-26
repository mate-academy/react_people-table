import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
  <nav className="nav">
    <ul className="nav__list">
      <li className="nav__item">
        <NavLink
          to="/"
          exact
          className="nav__link"
          activeClassName="nav__link--active"
        >
        Home
        </NavLink>
      </li>
      <li className="nav__item">
        <NavLink
          to="/people"
          className="nav__link"
          activeClassName="nav__link--active"
        >
        People
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;
