import React, {useState, useCallback} from 'react';
import {NavLink, Route, useLocation, useHistory} from "react-router-dom";
import debounce from 'lodash/debounce';

const Nav: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';
  const [input, setInput] = useState(query);

  const updateQuery = useCallback(debounce(
    (query: string) => {
      if(query){searchParams.set('query', query);}
      else{searchParams.delete('query');}

      history.push({
        search: searchParams.toString()
      })
    }, 500),[])

  const handleQueryUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
      updateQuery(event.target.value)
  }
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
              value={input}
              onChange={handleQueryUpdate}
            />
          </Route>
        </li>
      </ul>

    </nav>)
};

export default Nav;
