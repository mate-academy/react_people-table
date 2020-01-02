import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import './App.scss';
import PeopleTable from './PeopleTable';
import { getPeopleFromServer } from './api';

const getPeopleWithIds = peopleList => peopleList.map(
  (person, i) => ({
    ...person,
    id: i,
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
  })
);

const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [curField, setCurField] = useState('');
  const location = useLocation();
  const history = useHistory();
  const search = new URLSearchParams(location.search);
  const query = search.get('query');
  let visiblePeople = [...people];

  const getPeople = async() => {
    const peopleFromServer = await getPeopleFromServer();
    const peopleFromServerWithIds = getPeopleWithIds(peopleFromServer);

    setPeople(peopleFromServerWithIds);
  };

  useEffect(() => {
    getPeople();
  }, []);

  if (query) {
    const searchQuery = query.trim().toLowerCase();

    visiblePeople = people.filter(
      person => (person.name + person.mother + person.father).toLowerCase()
        .includes(searchQuery)
    );
  }

  const sortData = (field, type) => {
    let peopleCopy = [...people];

    switch (type) {
      case 'string':
        peopleCopy = peopleCopy
          .map(person => ({
            ...person,
            [field]: person[field] || '',
          }))
          .sort((a, b) => a[field].localeCompare(b[field]));

        return peopleCopy;

      case 'number':
        peopleCopy.sort((a, b) => a[field] - b[field]);

        return peopleCopy;

      default:
        peopleCopy.sort();

        return peopleCopy;
    }
  };

  const sortFields = (field, type, sortOrder) => {
    search.set('sortBy', field);

    if (field !== curField) {
      if (sortOrder === 'asc') {
        setPeople(sortData(field, type));
        search.set('sortOrder', 'asc');
      } else {
        setPeople(sortData(field, type).reverse());
        search.set('sortOrder', 'desc');
      }

      setCurField(field);
    } else {
      setPeople(prev => [...prev].reverse());
      setCurField('');
      search.set(
        'sortOrder', search.get('sortOrder') === 'desc' ? 'asc' : 'desc'
      );
    }

    history.push({ search: search.toString() });
  };

  return (
    <div className="App">
      <h1 className="title">
        People table
      </h1>
      <section className="people">
        <DebounceInput
          className="search"
          placeholder="Type to search..."
          type="search"
          debounceTimeout={500}
          onChange={(e) => {
            search.set('query', e.target.value);
            history.push({ search: search.toString() });
          }}
        />
        {people.length > 0
          ? (
            <PeopleTable
              people={visiblePeople}
              sortFields={sortFields}
              sortData={sortData}
            />
          )
          : 'Loading...'
        }
        <div className="people__count">
          {`Rows in table: ${visiblePeople.length}`}
        </div>
      </section>
    </div>
  );
};

export default PeoplePage;
