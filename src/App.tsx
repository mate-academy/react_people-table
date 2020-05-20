import React, {
  useState, useMemo, useEffect, useCallback,
} from 'react';
import './App.scss';
import {
  Route, useLocation, useHistory, Redirect, NavLink
} from 'react-router-dom';

import { getPeople } from './helper/getPeople';
import { PeopleTable } from './components/PeopleTable';
import { debounce } from './helper/debounce';
import { SearchPeople } from './components/SearchPeople';
import { AddPerson } from './components/AddPerson';
import { filterPeople } from './helper/filterPeople'
import { sortPeople } from './helper/sortPeople';
import { sortedMethods } from './components/sortedMethos'

const App = () => {
  const [people, setPeople] = useState<People[]>([]);
  const [query, setQuery] = useState('');
  const [sortingParam, setSortingParam] = useState('id');
  const [isReverse, setIsReverse] = useState('asc');
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const sorting = useMemo(() => searchParams.get("sortBy"), [searchParams]);
  const order = useMemo(() => searchParams.get("sortOrder"), [searchParams]);
  const searchQuery = useMemo(() => searchParams.get("query"), [searchParams]);

  useEffect(() => {
    if (((sorting !== sortingParam) || (order !== isReverse)) && sorting) {
      sortBy(sorting, sortedMethods[sorting])
    }

    if (searchQuery && searchQuery !== query) {
      setQuery(searchQuery)
      startDebounce(searchQuery);
    }

  }, [searchParams])

  useEffect(() => {
    getPeople()
      .then(people => {
        setPeople(people);
      });
  }, []);

  const sortBy = (sortParam: string, sortType: string) => {
    if (sortParam === sortingParam) {
      const sortedPeople = [...people].reverse();

      setIsReverse(isReverse === 'asc' ? 'desc' : 'asc');
      setPeople(sortedPeople);
      console.log(isReverse);
      searchParams.set('sortBy', `${sortParam}`);
      searchParams.set('sortOrder', `${isReverse === 'asc' ? 'desc' : 'asc'}`);

      history.push({
        search: searchParams.toString(),
      });

      return;
    }

    const sortedPeople = sortPeople(people, sortParam, sortType)

    setPeople(sortedPeople);

    setIsReverse('asc');

    searchParams.set('sortBy', `${sortParam}`);
    searchParams.set('sortOrder', 'asc');

    history.push({
      search: searchParams.toString(),
    });

    setSortingParam(sortParam);
  };

  const startDebounce = (value: string) => {
    debounceWrapper(value);
  };

  const debounceWrapper = useCallback(
    debounce((value: string) => setQuery(value), 1000),
    [],
  );


  const filteredPeople = useMemo(
    () => filterPeople(query, people),
    [query, people],
  );

  const addPerson = (
    name: string,
    born: string,
    died: string,
    sex: string,
    father: string,
    mother: string,
  ) => {
    const allId: number[] = people.map(person => person.id as number);
    const nextId = Math.max(...allId) + 1;
    const age = +died - +born;
    const century = Math.ceil(+born / 100);

    const newPerson = {
      id: nextId,
      name,
      born: +born,
      died: +died,
      sex,
      father,
      mother,
      age,
      century,
      children: '',
    };

    setPeople([...people, newPerson]);

    return <Redirect to="/people/:id?" />;
  };

  return (
    <div className="App">
      <nav>
        <ul className="list">
          <li className="item">
            <NavLink
              activeClassName="activeLink"
              className="linka"
              to="/"
              exact
            >
              Home
            </NavLink>
          </li>
          <li className="item">
            <NavLink
              activeClassName="activeLink"
              className="linka"
              to="/people"
            >
              People Table
            </NavLink>
          </li>
          <li className="item">
            <NavLink
              activeClassName="activeLink"
              className="linka"
              to="/new-person"
            >
              Add person
            </NavLink>
          </li>
        </ul>
      </nav>
      <Route
        exact
        path="/people/:id?"
        render={() => (
          <>
            <SearchPeople startDebounce={startDebounce} />
            <PeopleTable people={filteredPeople} sortBy={sortBy} />
          </>
        )}
      />
      <Route
        exact
        path="/"
        render={() => (
          <>
            <h1 className="title">Demo Header</h1>
          </>
        )}
      />
      <Route
        exact
        path="/new-person"
        render={() => (
          <>
            <AddPerson people={people} addPerson={addPerson} />
          </>
        )}
      />
    </div>
  );
};

export default App;
