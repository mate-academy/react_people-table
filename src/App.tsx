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

  enum enumNumbers {
    id = 'id',
    born = 'born',
    died = 'died',
    century = 'century',
    age = 'age',
  }
  enum enumString {
    name = 'name',
    sex = 'sex',
    motherName = 'motherName',
    fatherName = 'fatherName',
  }

  useEffect(() => {
    peopleFromServer.then(result => {
      setPeople(result.map((person, index) => (
        {
          ...person,
          id: index + 1,
          father: result.find(personFather => personFather.name === person.fatherName),
          mother: result.find(personMother => personMother.name === person.motherName),
          century: Math.ceil(person.died / 100),
          age: person.died - person.born,
        }
      )));
    });
  }, []);

  const sortByNumber = (query: enumNumbers) => {
    if (searchParams.get('sortOrder') === 'asc') {
      return (a: PersonWithId, b: PersonWithId) => a[query] - b[query];
    }

    return (a: PersonWithId, b: PersonWithId) => b[query] - a[query];
  };

  const sortByString = (query: enumString) => {
    if (searchParams.get('sortOrder') === 'asc') {
      return (a: PersonWithId, b: PersonWithId) => (
        (a[query] || 'z').localeCompare((b[query] || 'z'))
      );
    }

    return (a: PersonWithId, b: PersonWithId) => (
      (b[query] || 'z').localeCompare((a[query] || 'z'))
    );
  };

  let comparator: (a: PersonWithId, b: PersonWithId) => number = () => 0;

  useMemo(() => {
    switch (searchParams.get('sortBy')) {
      case 'id':
        comparator = sortByNumber(enumNumbers.id);
        break;
      case 'name':
        comparator = sortByString(enumString.name);
        break;
      case 'sex':
        comparator = sortByString(enumString.sex);
        break;
      case 'born':
        comparator = sortByNumber(enumNumbers.born);
        break;
      case 'died':
        comparator = sortByNumber(enumNumbers.died);
        break;
      case 'age':
        comparator = sortByNumber(enumNumbers.age);
        break;
      case 'century':
        comparator = sortByNumber(enumNumbers.century);
        break;
      case 'mother':
        comparator = sortByString(enumString.motherName);
        break;
      case 'father':
        comparator = sortByString(enumString.fatherName);
        break;
      default:
        setPeople(people);
        break;
    }

    setPeople([...people.sort(comparator)]);
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
