import React from 'react';
import { Container } from 'semantic-ui-react';
import { NavLink, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import PeopleList from './components/PeopleList';

const App = () => (
  <Container>
    <NavLink
      className="waves-effect waves-light btn"
      to="/"
      exact
    >
Home
    </NavLink>

    <NavLink
      className="waves-effect waves-light btn"
      to="/people"
    >
      <i className="material-icons left">cloud</i>
Load People
    </NavLink>

    <Switch>
      <Route exact path="/" render={() => (<h1>Home Page</h1>)} />
      <Route path="/people/:name?" component={PeopleList} />
    </Switch>
  </Container>
);

export default App;
