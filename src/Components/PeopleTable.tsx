import React, {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import debounce from 'lodash/debounce';
import cn from 'classnames';
import { useHistory, useLocation } from 'react-router-dom';

import { getPeople } from '../helpers/api';
import { PersonRow } from './PersonRow';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || '';
  const [visibleQuery, setVisibleQuery] = useState(query);

  useEffect(() => {
    const preparePeople = async () => {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer.map((person: Person, i: number) => ({
        ...person,
        id: i + 1,
      })));
    };

    preparePeople();
  }, []);

  const filtredPeople = (peopleList: Person[], pattern: string) => (
    peopleList.filter((person: Person) => (
      (`${person.name} ${person.motherName} ${person.fatherName}`)
        .toLocaleLowerCase()
        .includes(pattern.toLocaleLowerCase().trim())
    ))
  );

  const updateQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      history.push({
        search: searchParams.toString(),
      });
    }, 500),
    [],
  );

  const handleQueryUpdate = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setVisibleQuery(value);
    updateQuery(value);
  };

  useEffect(
    () => setVisibleQuery(query),
    [query],
  );

  const handleSetSort = (newSortMode: string) => {
    const headers = ['born', 'died', 'name', 'sex'];

    if (headers.includes(newSortMode)) {
      searchParams.set('sortBy', newSortMode);

      history.push({
        search: searchParams.toString(),
      });
    }

    switch (newSortMode) {
      case 'born': setPeople([...people].sort((a, b) => +a.born - +b.born)); break;
      case 'died': setPeople([...people].sort((a, b) => +a.died - +b.died)); break;
      case 'name': setPeople([...people].sort((a, b) => a.name.localeCompare(b.name))); break;
      case 'sex': setPeople([...people].sort((a, b) => b.sex.localeCompare(a.sex))); break;
      default: setPeople(people);
    }
  };

  useEffect(
    () => handleSetSort(sortBy),
    [sortBy],
  );

  const visiblePeople = useMemo(
    () => filtredPeople(people, query),
    [people, query],
  );

  const headers = ['id', 'name', 'sex', 'born', 'died', 'mother', 'father'];

  return (
    <>
      <input
        type="text"
        value={visibleQuery}
        onChange={handleQueryUpdate}
      />
      <table className="PeopleTable table">
        <thead>
          <tr className="thead-light">
            {headers.map(header => (
              <th
                scope="col"
                className={cn({
                  'bg-info': searchParams.get('sortBy') === header,
                })}
                abbr={header}
                key={header}
                onClick={() => handleSetSort(header)}
              >
                {header}
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
