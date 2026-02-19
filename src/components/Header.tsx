import { NavLink } from 'react-router-dom';

export const Header = () => (
  <header className="mb-4">
    <nav className="tabs is-boxed">
      <ul>
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/people">People</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);
