import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => (
  <header className="header">
    <NavLink to="/" className="header__link">
      Home
    </NavLink>
    <NavLink to="/people" className="header__link">
      People
    </NavLink>
  </header>
);

export default Header;
