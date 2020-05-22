import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import './Nav.scss';
import { Input, Menu } from 'semantic-ui-react';

const Nav = () => (
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
          />
        </Menu.Item>
      </Route>
    </Menu>
  </>
);

export default Nav;
