import React, { ChangeEventHandler, useCallback, useState } from 'react';
import {
  NavLink, Route, useHistory, useLocation,
} from 'react-router-dom';
import debounce from 'lodash.debounce';

export const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [queryWord, setQueryWord] = useState(searchParams.get('query') || '');

  const applyQuery = useCallback(
    debounce((query: string) => {
      if (query) {
        searchParams.set('query', query);
      } else {
        searchParams.delete('query');
      }

      history.push({ search: searchParams.toString() });
    }, 1000), [],
  );


  const hadleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setQueryWord(target.value);
    applyQuery(target.value);
  };

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
          <input
            placeholder="Search"
            value={queryWord}
            onChange={hadleChange}
            type="text"
          />
        </Route>
      </div>


    </header>
  );
};
