import React, {
  useEffect, useState, useMemo, useCallback, ChangeEventHandler,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { getPreparedPeople } from './api';
import PersonRow from './PersonRow';

const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [currentQuery, setCurrentQuery] = useState('');

  const sortBy = useMemo(() => searchParams.get('sortBy') || '', [searchParams]);
  const sortOrder = useMemo(() => searchParams.get('sortOrder') || '', [searchParams]);
  const queryFromURL = useMemo(() => searchParams.get('query') || '', [searchParams]);


  const headOfTable = ['id', 'name', 'sex', 'born', 'died', 'age', 'father', 'mother', 'century'];

  useEffect(() => {
    getPreparedPeople().then((peopleFromServer) => {
      setPeople(peopleFromServer);
    });
  }, []);

  const visiblePeople = useMemo(() => {
    return people
      .filter(person => (
        (person.name + person.father + person.mother)
          .toLowerCase().includes(queryFromURL.toLowerCase())
      ));
  }, [people, queryFromURL]);

  const sortingBy = (headItem: string) => {
    if (sortBy === headItem && sortOrder === 'asc') {
      searchParams.set('sortOrder', 'desc');
    } else {
      searchParams.set('sortOrder', 'asc');
    }

    searchParams.set('sortBy', headItem);
    history.push({
      search: searchParams.toString(),
    });
  };

  useMemo(() => {
    switch (sortOrder) {
      case 'asc':
        switch (sortBy) {
          case 'id':
          case 'born':
          case 'died':
          case 'age':
          case 'century':
            visiblePeople.sort((a, b) => a[sortBy] - b[sortBy]);
            break;
          case 'name':
          case 'sex':
          case 'father':
          case 'mother':
            visiblePeople.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
            break;
          default:
        }

        break;

      case 'desc':
        switch (sortBy) {
          case 'id':
          case 'born':
          case 'died':
          case 'age':
          case 'century':
            visiblePeople.sort((a, b) => b[sortBy] - a[sortBy]);
            break;
          case 'name':
          case 'sex':
          case 'father':
          case 'mother':
            visiblePeople.sort((a, b) => b[sortBy].localeCompare(a[sortBy]));
            break;
          default:
        }

        break;
      default:
    }
  },
  [visiblePeople, sortOrder, sortBy]);

  useEffect(() => {
    setCurrentQuery(queryFromURL);
  }, [queryFromURL]);

  const updateQueryInURL = (query: string) => {
    if (query) {
      searchParams.set('query', query);
    } else {
      searchParams.delete('query');
    }

    history.push({ search: searchParams.toString() });
  };

  const queryWithDebounce = useCallback(debounce(updateQueryInURL, 500), []);

  const changeQuery: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setCurrentQuery(target.value);
    queryWithDebounce(target.value);
  };

  return (
    <>
      <input
        type="text"
        className="input"
        value={currentQuery}
        placeholder="whom you search"
        onChange={changeQuery}
      />
      <table className="Table">
        <thead>
          <tr>
            {headOfTable.map(headItem => (
              <th
                key={headItem}
                onClick={() => sortingBy(headItem)}
              >
                {headItem === sortBy && <span>*</span>}
                {headItem}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <PersonRow people={visiblePeople} />
        </tbody>
      </table>
    </>
  );
};

export default PeopleTable;
