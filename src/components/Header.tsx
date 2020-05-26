import React from 'react';
import { NavLink, Route, useHistory, useLocation } from 'react-router-dom';

export const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search)

  const querySearch = searchParams.get('query') || '';
  return (
    <header className="navbar bg-secondary">
      <div className="container">
        <nav>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink exact to="/">Home page</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/people">People page</NavLink>
            </li>
          </ul>
        </nav>
        <Route path="/people">
          <input placeholder="Search"
          value = {querySearch}
          onChange = {(e) => {
            searchParams.set('query', e.target.value)
            history.push({
              search: searchParams.toString()
            })
          }}
          type="text"/>
        </Route>
      </div>



    </header>
  );
};
