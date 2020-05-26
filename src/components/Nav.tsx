import React from 'react';
import {NavLink, Route, useLocation, useHistory} from "react-router-dom";


const Nav: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';

  return (
    <nav>
      <ul className="navlist">
        <li className="navlist__item">
          <NavLink
            to="/"
            exact
            className="navlist__link">
            Home
          </NavLink>
        </li>
        <li className="navlist__item">
          <NavLink
            to={{
              pathname: '/people',
              search: '?query=',
            }}
            className="navlist__link">
            People Page
          </NavLink>
        </li>

        <li className="navlist__item search">
          <Route path='/people'>
            <input
              type="text"
              className='search_input'
              value={query}
              onChange={(event) => {
                searchParams.set('query', event.target.value);
                history.push({
                  search: searchParams.toString()
                })
              }}
            />
          </Route>
        </li>
      </ul>

    </nav>)
};

export default Nav;
