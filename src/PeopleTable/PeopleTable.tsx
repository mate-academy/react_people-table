import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import debounce from 'lodash/debounce';
import { useHistory, useLocation } from 'react-router-dom';
import { getPeople, TABLE_TITLES } from '../api/api';
import { PersonRow } from '../Person/PersonRow';

import './PeopleTable.scss';


const filterPeople = (people: Person[], query: string) => {
  return (
    people.filter((person) => (person.name + person.fatherName + person.motherName)
      .toLowerCase()
      .includes(query.toLowerCase()))
  );
};

export const PeopleTable = () => {
  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const query = useMemo(() => searchParams.get('query') || '', [searchParams]);
  const sortBy = useMemo(() => searchParams.get('sortBy') || '', [searchParams]);
  const sortOrder = useMemo(() => searchParams.get('sortOrder') || '', [searchParams]);

  const [people, setPeople] = useState<Person[]>([]);
  const [currentQuery, setCurrentQuery] = useState<string>(query);


  useEffect(() => {
    getPeople()
      .then(data => setPeople(
        data.map((person, index) => {
          const mother = data.find(mom => mom.name === person.motherName);
          const father = data.find(dad => dad.name === person.fatherName);

          return {
            ...person,
            id: index + 1,
            motherSlug: mother?.slug || person.motherName,
            fatherSlug: father?.slug || person.fatherName,
          };
        }),
      ));
  }, []);

  const historyPushWithDebounce = useCallback(debounce(history.push, 500), []);

  const handlerQueryChange = (event: { target: { value: string } }) => {
    setCurrentQuery(event.target.value);
    searchParams.set('query', event.target.value);
    historyPushWithDebounce({
      search: searchParams.toString(),
    });
  };

  const preparedPeople = useMemo(() => filterPeople(people, query), [people, query]);

  useMemo(() => {
    switch (sortOrder) {
      case 'desc':
        switch (sortBy) {
          case 'id':
          case 'born':
          case 'died':
            preparedPeople.sort((a, b) => b[sortBy] - a[sortBy]);
            break;
          case 'name':
          case 'sex':
            preparedPeople.sort((a, b) => b[sortBy].localeCompare(a[sortBy]));
            break;
          default:
        }

        break;
      case 'asc':
        switch (sortBy) {
          case 'id':
          case 'born':
          case 'died':
            preparedPeople.sort((a, b) => a[sortBy] - b[sortBy]);
            break;
          case 'name':
          case 'sex':
            preparedPeople.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
            break;
          default:
        }

        break;
      default:
    }
  },
  [preparedPeople, sortOrder, sortBy]);

  const handleTitleClick = (title: string) => {
    if (title === 'mother' || title === 'father') {
      return;
    }

    if (sortBy === title && sortOrder === 'asc') {
      searchParams.set('sortOrder', 'desc');
    } else {
      searchParams.set('sortOrder', 'asc');
    }

    searchParams.set('sortBy', title);
    history.push({
      search: searchParams.toString(),
    });
  };

  return (
    <>
      <input
        placeholder=" Filtering people by name"
        type="text"
        value={currentQuery}
        onChange={handlerQueryChange}
      />
      <table className="people" role="grid">
        <thead>
          <tr>
            {TABLE_TITLES.map((title: string) => (
              <th
                key={title}
                onClick={() => handleTitleClick(title.toLowerCase())}
              >
                {title}
                {sortOrder === 'asc' && title.toLowerCase() === sortBy
                && (
                  <img className="sortFlag" src="../api/sort-down.svg" alt="sort_icon" />
                )}
                {sortOrder === 'desc' && title.toLowerCase() === sortBy
                && (
                  <img className="sortFlag" src="../api/sort-up.svg" alt="sort_icon" />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <PersonRow people={preparedPeople} />
        </tbody>
      </table>
    </>
  );
};
