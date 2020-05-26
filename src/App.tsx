import React, { useState, useEffect, useMemo } from 'react';

import './App.css';
import {
  Route,
  Switch,
  useLocation,
  Redirect,
} from 'react-router-dom';
import { peopleFromServer } from './API';
import Table from './components/Table';
import Header from './components/Header/Header';


const App = () => {
  const [people, setPeople] = useState<PersonWithId[]>([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    peopleFromServer.then(result => (
      setPeople(result.map((person, index) => (
        {
          ...person,
          id: index + 1,
          father: result.find(personFather => personFather.name === person.fatherName),
          mother: result.find(personMother => personMother.name === person.motherName),
        }
      )))
    ));
  }, []);

  // const sortByNumber = (query: string) => (
  //   (searchParams.get('sortOrder') === 'asc')
  //     ? setPeople([...people].sort((a, b) => a[checkQuery(query)] - b[query]))
  //     : setPeople([...people].sort((a, b) => b[query] - a[query]))
  // );

  useMemo(() => {
    switch (searchParams.get('sortBy')) {
      case 'id':
        (searchParams.get('sortOrder') === 'asc')
          ? setPeople([...people].sort((a, b) => a.id - b.id))
          : setPeople([...people].sort((a, b) => b.id - a.id));
        break;
      case 'name':
        (searchParams.get('sortOrder') === 'asc')
          ? setPeople([...people].sort((a, b) => a.name.localeCompare(b.name)))
          : setPeople([...people].sort((a, b) => b.name.localeCompare(a.name)));
        break;
      case 'sex':
        (searchParams.get('sortOrder') === 'asc')
          ? setPeople([...people].sort((a, b) => a.sex.localeCompare(b.sex)))
          : setPeople([...people].sort((a, b) => b.sex.localeCompare(a.sex)));
        break;
      case 'born':
        (searchParams.get('sortOrder') === 'asc')
          ? setPeople([...people].sort((a, b) => a.born - b.born))
          : setPeople([...people].sort((a, b) => b.born - a.born));
        break;
      case 'died':
        (searchParams.get('sortOrder') === 'asc')
          ? setPeople([...people].sort((a, b) => a.died - b.died))
          : setPeople([...people].sort((a, b) => b.died - a.died));
        break;
      case 'age':
        (searchParams.get('sortOrder') === 'asc')
          ? setPeople([...people].sort((a, b) => (
            (a.died - a.born) - (b.died - b.born)
          )))
          : setPeople([...people].sort((a, b) => (
            (b.died - b.born) - (a.died - a.born)
          )));
        break;
      case 'century':
        (searchParams.get('sortOrder') === 'asc')
          ? setPeople([...people].sort((a, b) => (
            Math.ceil(a.died / 100) - Math.ceil(b.died / 100)
          )))
          : setPeople([...people].sort((a, b) => (
            Math.ceil(b.died / 100) - Math.ceil(a.died / 100)
          )));
        break;
      case 'mother':
        (searchParams.get('sortOrder') === 'asc')
          ? setPeople([...people].sort((a, b) => (a.motherName || 'z').localeCompare((b.motherName || 'z'))))
          : setPeople([...people].sort((a, b) => (b.motherName || 'z').localeCompare((a.motherName || 'z'))));
        break;
      case 'father':
        (searchParams.get('sortOrder') === 'asc')
          ? setPeople([...people].sort((a, b) => (a.fatherName || 'z').localeCompare((b.fatherName || 'z'))))
          : setPeople([...people].sort((a, b) => (b.fatherName || 'z').localeCompare((a.fatherName || 'z'))));
        break;
      default:
        setPeople(people);
        break;
    }
  }, [location.search]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <h1>Home</h1>
          )}
        />
        <Route
          path="/people/:name?"
          render={() => (
            <Table
              people={people}
            />
          )}
        />
        <Redirect
          from="/home"
          to="/"
        />
        <Route path="*">
          <h1>Not Found</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
