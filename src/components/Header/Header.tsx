import React, { FC } from 'react';
import {
  NavLink,
  // Switch,
  // Route,
  // Redirect,
} from 'react-router-dom';
// import { Home } from '../Home/Home';
// import { NotFoundPage } from '../NotFoundPage/NotFoundPage';

export const Header: FC = () => (
  <>
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/" exact>Home page</NavLink>
          </li>
          <li>
            <NavLink to="/people" exact>People page</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  </>

);
