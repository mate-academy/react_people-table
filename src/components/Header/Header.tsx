import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import PeopleFilter from '../PeopleFilter/PeopleFilter';
import './Header.css'

const Header = () => (
  <ul className="header__nav">
    <li className="nav__item">
      <NavLink to="/" exact className="nav__link">Home</NavLink>
    </li>
    <li className="nav__item">
      <NavLink to="/people" className="nav__link">People</NavLink>
    </li>
    <li className="nav__item nav__search-pannel">
      <Route path="/people/:slug?" component={PeopleFilter} />
    </li>
  </ul>
)

export default Header;
