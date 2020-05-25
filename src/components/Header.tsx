import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="navbar bg-secondary">
      <nav className="container">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink exact to="/">Home page</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/people">People page</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
