import React, { FC } from 'react';
import {
  HashRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PeopleList } from './components/PeopleList/PeopleList';

import './App.css';

const App: FC = () => (
  <HashRouter>
    <div className="App">
      <Header />
    </div>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route exact path="/home">
        <Redirect to="/" />
      </Route>
      <Route
        path="/people/:slug?"
        component={PeopleList}
      />
      <Route path="*" component={NotFoundPage} />
    </Switch>

  </HashRouter>
);

export default App;
