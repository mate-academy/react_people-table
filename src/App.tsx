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
import { sortedMethods } from './components/sortedMethos';

const App = () => {
  const [people, setPeople] = useState<People[]>([]);
  const [query, setQuery] = useState('');
  const [firstStart, setFirstStart] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sorting = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';


  const sortByLineParam = () => {
    if (!firstStart && sorting) {
      setFirstStart(true);
      sortBy(sorting, sortedMethods[sorting]);
    }
  };

  useEffect(() => {
    if (people.length) {
      sortByLineParam();
    }
  }, [sorting, people]);

  useEffect(() => {
    getPeople()
      .then(people => {
        setPeople(people);
      });
  }, []);

  const sortBy = (sortParam: string, sortType: string) => {
    let orderParam = '';

    if (sortOrder === 'asc') {
      const sortedPeople = [...people].sort(
        (a: People, b: People): number => {
          const comperator1 = a[sortParam] || '';
          const comperator2 = b[sortParam] || '';

          if (sortType === 'number') {
            return Number(comperator2) - Number(comperator1);
          }

          if (sortType === 'string') {
            return (comperator2 as string).localeCompare(comperator1 as string);
          }

          return 0;
        },
      );

      if (!firstStart) {
        orderParam = 'asc';
      } else {
        orderParam = 'desc';
      }

      setPeople(sortedPeople);

      searchParams.set('sortBy', `${sortParam}`);
      searchParams.set('sortOrder', `${orderParam}`);

      history.push({
        search: searchParams.toString(),
      });

      setFirstStart(true);


      return;
    }

    const sortedPeople = [...people].sort(
      (a: People, b: People): number => {
        const comperator1 = a[sortParam] || '';
        const comperator2 = b[sortParam] || '';

        if (sortType === 'number') {
          return Number(comperator1) - Number(comperator2);
        }

        if (sortType === 'string') {
          return (comperator1 as string).localeCompare(comperator2 as string);
        }

        return 0;
      },
    );

    setPeople(sortedPeople);

    if (!firstStart) {
      orderParam = 'desc';
    } else {
      orderParam = 'asc';
    }

    setFirstStart(true);

    searchParams.set('sortBy', `${sortParam}`);
    searchParams.set('sortOrder', `${orderParam}`);

    history.push({
      search: searchParams.toString(),
    });
  };


  const filterPeople = () => {
    if (!query) {
      return people;
    }

    const filter = people
      .filter(person => {
        const { name } = person;
        const { mother } = person;
        const { father } = person;
        const searchQuery = query.toLowerCase();

        if (!searchQuery) {
          return false;
        }

        if (name.toLowerCase().includes(searchQuery)
          || mother.toLowerCase().includes(searchQuery)
          || father.toLowerCase().includes(searchQuery)) {
          return true;
        }

        return false;
      });

    return filter;
  };

  const startDebounce = (value: string) => {
    debounceWrapper(value);
  };

  const debounceWrapper = useCallback(
    debounce((value: string) => setQuery(value), 1000),
    [],
  );


  const filteredPeople = useMemo(
    () => filterPeople(),
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
        </ul>
      </nav>
      <Route
        path="/people/:id?"
        render={() => (
          <>
            <AddPerson people={people} addPerson={addPerson} />
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
            <h1 className="title">Demo heaeder</h1>
          </>
        )}
      />
    </div>
  );
};

export default App;
