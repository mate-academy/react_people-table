import React from 'react';
import {
  NavLink, Route, useHistory, useLocation,
} from 'react-router-dom';
import { Input, Menu } from 'semantic-ui-react';
import './Nav.scss';

const Nav = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query: string = searchParams.get('query') || '';
  const historyPush = (name: string, param: string) => {
    if (param) {
      searchParams.set(name, param);
    } else {
      searchParams.delete(name);
    }

    history.push({ search: searchParams.toString() });
  };

  return (
    <>
      <Menu inverted color="teal" className="Nav">
        <Menu.Item
          as={NavLink}
          name="home"
          to="/"
          exact
        />
        <Menu.Item
          as={NavLink}
          name="people"
          to="/people"
          exact
        />
        <Route path="/people">
          <Menu.Item position="right">
            <Input
              className="Nav-Search icon"
              placeholder="Search..."
              icon="search"
              size="mini"
              value={query}
              onChange={(event) => {
                historyPush('query', event.target.value);
              }}
            />
          </Menu.Item>
        </Route>
      </Menu>
    </>
  );
};

export default Nav;
