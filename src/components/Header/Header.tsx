import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

export const Header: FC = () => (
  <header className="center">
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/" exact>Home page</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/people" exact>People page</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);
