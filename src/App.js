import React, { useState, useEffect } from 'react';
import './App.css';
// eslint-disable-next-line import/order
import {
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import getPeople from './Api/peopleApi';
import Home from './components/home';
import PeopleList from './components/peopleList';

const App = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    async function fetchPeople() {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer.map((person, i) => (
        {
          ...person,
          id: i + 1,
          age: person.died - person.born,
          century: Math.ceil(person.died / 100),
          mother: person.mother ? person.mother : 'No Information',
          father: person.father ? person.father : 'No Information',
          children: peopleFromServer
            .filter(child => child.mother === person.name
              || child.father === person.name)
            .map(item => (!item.name ? '---' : item.name))
            .join(', '),
        })));
    }

    fetchPeople();
  }, []);

  return (

    <div className="App">
      <h1>People table</h1>

      <section>
        <div>
          <nav>
            <ul>
              <li>
                <NavLink
                  exact
                  to="/"
                  className="nav__link"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/people/"
                  className="nav__link"
                >
                  People
                </NavLink>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route
              path="/people"
              render={props => (
                <PeopleList
                  {...props}
                  people={people}
                  setPeople={setPeople}
                />
              )}
            />
          </Switch>
        </div>
      </section>
    </div>
  );
};

export default App;
