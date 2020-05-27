import React, { useState, useEffect, useMemo } from 'react';
import {
  NavLink, Route, Switch, Redirect, useLocation,
} from 'react-router-dom';

import './App.css';
import HomePage from './components/HomePage/HomePage';
import PeoplePage from './components/PeoplePage/PeoplePage';
import { peopleFromServer } from './API';

const App = () => {
  const [people, setPeople] = useState<PersonWithParents[]>([]);

  useEffect(() => {
    peopleFromServer.then(result => (
      setPeople(result.map((person: Person, index: number) => ({
        id: index + 1,
        ...person,
        age: person.died - person.born,
        century: Math.ceil(person.died / 100),
        mather: result.find(el => person.motherName === el.name),
        father: result.find(el => person.fatherName === el.name),
      })))
    ));
  }, []);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);


  useMemo(() => {
    switch (searchParams.get('sortBy')) {
      case 'id':
        people.sort((a, b) => a.id - b.id);
        break;
      case 'name':
        people.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'sex':
        people.sort((a, b) => a.sex.localeCompare(b.sex));
        break;
      case 'born':
        people.sort((a, b) => a.born - b.born);
        break;
      case 'died':
        people.sort((a, b) => a.died - b.died);
        break;
      case 'age':
        people.sort((a, b) => a.age - b.age);
        break;
      case 'century':
        people.sort((a, b) => a.century - b.century);
        break;
      case 'mother':
        people.sort((a, b) => (a.motherName || '').localeCompare((b.motherName || '')));
        break;
      case 'father':
        people.sort((a, b) => (a.fatherName || '').localeCompare((b.fatherName || '')));
        break;
      default:
        people.sort();
        break;
    }

    if (searchParams.get('sortOrder') === 'desc') {
      people.reverse();
    }

    setPeople([...people]);
  }, [location.search]);


  return (
    <div className="app">
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink to="/" className="nav__link">
              Home Page
            </NavLink>
          </li>

          <li className="nav__item">
            <NavLink to="/people" className="nav__link">
              People Page
            </NavLink>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/" exact component={HomePage} />

        <Route
          path="/people:name?"
          render={() => (
            <PeoplePage people={people} />
          )}
        />

        <Redirect
          from="/home"
          to="/"
        />

        <h1 className="pageNotFound">Page not found</h1>
      </Switch>
    </div>
  );
};

export default App;
