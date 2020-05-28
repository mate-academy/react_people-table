import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Input, Menu } from 'semantic-ui-react';
import './Nav.scss';

type Props = {
  query: string;
  setQuery: (val: string) => void;
  applyQuery: (val: string) => void;
};

const Nav: React.FC<Props> = ({ query, setQuery, applyQuery }) => {
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
              onChange={({ target }) => {
                setQuery(target.value);
                applyQuery(target.value);
              }}
            />
          </Menu.Item>
        </Route>
      </Menu>
    </>
  );
};

export default Nav;
