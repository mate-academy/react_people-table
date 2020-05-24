import React from 'react';
import {
  Route, Switch, Redirect
} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import PeoplePage from './components/PeoplePage'
import NotFoundPage from "./components/NotFoundPage";
import Nav from "./components/Nav";


const App: React.FC = () => {

  return (
    <>
      <header>
        <Nav />

      </header>
      <main>
        <Switch>
        <Route path="/" exact component={Home} />
        <Redirect from='/home' to='/' />
        <Route
          path="/people/:personSlug?"

          component={PeoplePage}
        />
        <Route component={NotFoundPage} />
      </Switch>
      </main>
    </>
  );
};


export default App;
