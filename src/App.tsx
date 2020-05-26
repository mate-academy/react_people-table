import React  from 'react';
import { Route, NavLink } from 'react-router-dom';
import { PeoplePage } from './PeoplePage';
import { FavoritesPage } from './FavoritesPage';

import './App.css';

const App = () => {
  return (
    <>
      <NavLink to="/people">People</NavLink>
      <NavLink to="/favorites">Favorites</NavLink>
      <Route path="/people" exact component={PeoplePage} />
      <Route path="/favorites" exact component={FavoritesPage} />
    </>
  );
};

export default App;
