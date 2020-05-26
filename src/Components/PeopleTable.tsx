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
  const query = useMemo(() => searchParams.get('query') || '', [searchParams]);
  const sortBy = useMemo(() => searchParams.get('sortBy') || '', [searchParams]);
  const sortOrder = useMemo(() => searchParams.get('sortOrder') || '', [searchParams]);
  const [visibleQuery, setVisibleQuery] = useState(query);

  useEffect(() => {
    const preparePeople = async () => {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer.map((person: Person, i: number) => ({
        ...person,
        id: i + 1,
        mother: peopleFromServer
          .find((mother: PersonFromServer) => mother.name === person.motherName),
        father: peopleFromServer
          .find((father: PersonFromServer) => father.name === person.fatherName),
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

  const updateQueryUrl = useCallback(
    debounce((value: string) => {
      history.push({ search: value });
    }, 500),
    [],
  );

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (value) {
      searchParams.set('query', value);
    } else {
      searchParams.delete('query');
    }

    updateQueryUrl(searchParams.toString());
    setVisibleQuery(value);
  };

  const handleSort = (newSortMode: string) => {
    const headers = ['born', 'died', 'name', 'sex'];
    const sortOrderToggle = sortOrder === 'asc' ? 'desc' : 'asc';

    if (headers.includes(newSortMode)) {
      searchParams.set('sortBy', newSortMode);
      searchParams.set('sortOrder', sortOrderToggle);

      history.push({
        search: searchParams.toString(),
      });
    }
  };

  const visiblePeople = useMemo(
    () => filtredPeople(people, query),
    [people, query],
  );

  useMemo(
    () => setVisibleQuery(query),
    [query],
  );

  useMemo(() => {
    switch (sortOrder) {
      case 'desc':
        switch (sortBy) {
          case 'born':
          case 'died':
            visiblePeople.sort((a, b) => b[sortBy] - a[sortBy]); break;
          case 'name':
          case 'sex':
            visiblePeople.sort((a, b) => b[sortBy].localeCompare(a[sortBy])); break;
          default:
        }

        break;
      case 'asc':
        switch (sortBy) {
          case 'born':
          case 'died':
            visiblePeople.sort((a, b) => a[sortBy] - b[sortBy]); break;
          case 'name':
          case 'sex':
            visiblePeople.sort((a, b) => a[sortBy].localeCompare(b[sortBy])); break;
          default:
        }

        break;
      default:
    }
  }, [visiblePeople, sortOrder, sortBy]);

  const headers = ['id', 'name', 'sex', 'born', 'died', 'mother', 'father'];

  return (
    <>
      <input
        type="text"
        value={visibleQuery}
        onChange={handleSearch}
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
                onClick={() => handleSort(header)}
              >
                {searchParams.get('sortBy') === header
                  && (sortOrder === 'asc'
                    ? (
                      <svg className="bi bi-caret-up-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                      </svg>
                    )
                    : (
                      <svg className="bi bi-caret-down-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                      </svg>
                    ))}
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
