import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-menu">
        <div className="navbar-start">
          <NavLink
            className="navbar-item"
            activeClassName="is-active"
            to="/"
            exact
          >
            Home
          </NavLink>
          <NavLink
            className="navbar-item"
            activeClassName="is-active"
            to="/people"
            exact
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
