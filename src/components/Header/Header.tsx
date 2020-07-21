import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

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
