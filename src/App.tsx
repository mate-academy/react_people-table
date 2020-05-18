import React, { useState, useMemo, useEffect } from 'react';
import './App.scss';

import { getPeople } from './helper/getPeople';
import { PeopleTable } from './components/PeopleTable';
import { debounce } from './helper/debounce';
import { SearchPeople } from './components/SearchPeople';
import { AddPerson } from './components/AddPerson';


const App = () => {
  const [people, setPeople] = useState<People[]>([]);
  const [query, setQuery] = useState('');
  const [sortMethod, setSortMethod] = useState('id');

  useEffect(() => {
    getPeople()
      .then(people => setPeople(people));
  }, []);

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

  const startDebounce = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    debounceWrapper(value);
  };

  const debounceWrapper = debounce((value: string) => setQuery(value), 1000);


  const filteredPeople = useMemo(
    () => filterPeople(),
    [query, people],
  );

  const sortBy = (sortParam: string, sortType: string) => {
    if (sortMethod === sortParam) {
      setPeople([...people].reverse());

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

    setSortMethod(sortParam);
    setPeople(sortedPeople);
  };

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
  };

  return (
    <div className="App">
      <AddPerson people={people} addPerson={addPerson} />
      <SearchPeople startDebounce={startDebounce} />
      <PeopleTable people={filteredPeople} sortBy={sortBy} />
    </div>
  );
};

export default App;
