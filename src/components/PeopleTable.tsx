import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import debounce from 'lodash/debounce';

import { getPeople } from '../helpers/api';
import { PersonRow } from './PersonRow';

type Props = {
  people: PersonType[];
};

export const PeopleTable: React.FC<Props> = () => {
  const THEADS = [
    'id',
    'name',
    'sex',
    'born',
    'died',
    'mother',
    'father',
  ];
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);

  const query = useMemo(() => searchParams.get('query') || '', [searchParams]);
  const sortBy = useMemo(() => searchParams.get('sortBy') || '', [searchParams]);
  const sortOrder = useMemo(() => searchParams.get('sortOrder'), [searchParams] || '');

  const [people, setPeople] = useState<PersonType[]>([]);
  const [currentQuery, setCurrentQuery] = useState<string>(query);


  useEffect(() => {
    getPeople()
      .then(data => setPeople(
        data.map((person: PersonWithParents, index: number) => {
          const mother = data.find(m => m.name === person.motherName);
          const father = data.find(f => f.name === person.fatherName);

          return {
            ...person,
            id: index + 1,
            motherSlug: mother?.slug || person.motherName,
            fatherSlug: father?.slug || person.fatherName,
          };
        }),
      ));
  }, []);

  const getVisiblePeople = (peopleCompleted: PersonWithParents[], querySearch: string) => {
    const pattern = new RegExp(querySearch, 'i');

    return peopleCompleted
      .filter(p => pattern.test(p.name + p.motherName + p.fatherName));
  };

  const visiblePeople = useMemo(() => {
    return getVisiblePeople(people, query);
  }, [query, people]);

  useMemo(() => {
    switch (sortBy) {
      case 'id':
      case 'born':
      case 'died':
        return visiblePeople.sort((a, b) => a[sortBy] - b[sortBy]);

      case 'name':
      case 'sex':
        return visiblePeople.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

      default:
        return visiblePeople;
    }
  },
  [visiblePeople, sortBy, sortOrder]);

  const handlePeopleSort = (column: string) => {
    if (column !== 'mother' && column !== 'father') {
      if (sortBy === column && sortOrder === 'asc') {
        searchParams.set('sortOrder', 'desc');
      } else {
        searchParams.set('sortOrder', 'asc');
      }

      searchParams.set('sortBy', column);
      history.push({
        search: searchParams.toString(),
      });
    }
  };

  useMemo(() => {
    return sortOrder === 'desc' ? visiblePeople.reverse() : visiblePeople;
  }, [visiblePeople, sortOrder]);

  const historyPushWithDebounce = useCallback(debounce(history.push, 500), []);

  const handleSearchChange = (event: { target: { value: string }}) => {
    setCurrentQuery(event.target.value);
    searchParams.set('query', event.target.value);
    historyPushWithDebounce({
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    setCurrentQuery(query);
  }, [query]);

  return (
    <div className="container">
      <input
        className="table__search"
        placeholder="Find person"
        type="text"
        value={currentQuery}
        onChange={handleSearchChange}
      />
      <table className="PeopleTable people">
        <thead>
          <tr className="people__header">
            {THEADS.map((title: string) => (
              <th
                key={title}
                onClick={() => handlePeopleSort(title)}
              >
                {title}
                {sortBy === title ? '*' : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visiblePeople.map((person) => (
            <PersonRow person={person} key={person.slug} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
