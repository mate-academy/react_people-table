import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.scss';


export const Navigation: React.FC = () => (
  <header>
    <nav className="Nav">
      <ul className="Nav__list">
        <li className="Nav__item">
          <NavLink
            to="/"
            exact
            className="Nav__item"
          >
            Home
          </NavLink>
        </li>
        <li className="Nav__item">
          <NavLink
            to="/people"
            className="Nav__item"
          >
            People Page
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);
