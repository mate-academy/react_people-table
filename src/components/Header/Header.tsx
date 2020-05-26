import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'

const Header = () => (
  <ul className="header__nav">
    <li className="nav__item">
      <NavLink to="/" exact className="nav__link">Home</NavLink>
    </li>
    <li className="nav__item">
      <NavLink to="/people" className="nav__link">People</NavLink>
    </li>
  </ul>
)

export default Header;
