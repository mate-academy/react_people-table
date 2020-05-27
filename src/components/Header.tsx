import { NavLink } from 'react-router-dom';
import React from 'react';

export const Header = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink to="/" exact className="nav__link" activeClassName="nav__link--active">
            Home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/people" className="nav__link" activeClassName="nav__link--active">
            People
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
