import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => (
  <header className="header">
    <h1 className="header__capture">People Table Application</h1>
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item">
          <NavLink to="/" exact className="header__nav-link" activeClassName="header__nav-link--active">Home</NavLink>
        </li>
        <li className="header__nav-item">
          <NavLink to="/people" className="header__nav-link" activeClassName="header__nav-link--active">People</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);
