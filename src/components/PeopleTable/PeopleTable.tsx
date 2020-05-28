import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import debounce from 'lodash/debounce';
import { useHistory, useLocation } from 'react-router-dom';

import { PersonTable } from '../../interfaces/interfaces';
import PersonRow from '../PersonRow/PersonRow';

interface PersonArray {
  id: number;
  name: string;
  sex: string;
  fatherName: string;
  motherName: string;
  born: number;
  died: number;
  slug: string;
  age: number;
  century: number;
}

type Props = {
  people: PersonArray[];
};

const PeopleTable: React.FC<Props> = ({ people }) => {
  const location = useLocation();
  const searchURLParameters = new URLSearchParams(location.search);
  const history = useHistory();
  const tableHeader = ['Name', 'Sex', 'Born', 'Died', 'Father', 'Mother', 'Age', 'Century'];
  const peopleWithParents: PersonTable[] = people.map(person => ({
    ...person,
    father: people.find((parent) => parent.name === person.fatherName) || 'none',
    mother: people.find((parent) => parent.name === person.motherName) || 'none',
  }));
  const [sortedPeople, setSortedPeople] = useState<PersonTable[]>([]);
  const [searchTarget, setSearchTarget] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setSortedPeople([...peopleWithParents]);
  }, [people]);

  const visiblePeople = useMemo(() => {
    return sortedPeople.filter(person => (
      (person.name + person.father + person.mother)
        .toLowerCase()
        .includes(query.toLowerCase())));
  }, [sortedPeople, query]);

  useMemo(() => {
    const father = 'fatherName';
    const mother = 'motherName';

    switch (searchTarget) {
      case 'died':
      case 'born':
      case 'age':
      case 'century':
        visiblePeople.sort((a, b) => (a[searchTarget] - b[searchTarget]));
        break;
      case 'name':
      case 'sex':
        visiblePeople.sort((a, b) => (a[searchTarget].localeCompare(b[searchTarget])));
        break;
      case 'father':
        visiblePeople.sort((a, b) => (a[father].localeCompare(b[father])));
        break;
      case 'mother':
        visiblePeople.sort((a, b) => (a[mother].localeCompare(b[mother])));
        break;
      default:
        break;
    }
  }, [visiblePeople, searchTarget]);

  const handleClickForSorting = ((target: string) => {
    const lowerCaseTarget = target.toLowerCase();

    if (searchURLParameters.get('sortBy') === lowerCaseTarget
      && searchURLParameters.get('sortOrder') === 'asc') {
      searchURLParameters.set('sortOrder', 'desc');
      visiblePeople.reverse();
    } else {
      searchURLParameters.set('sortOrder', 'asc');
      visiblePeople.reverse();
    }

    searchURLParameters.set('sortBy', lowerCaseTarget);
    setSearchTarget(lowerCaseTarget);

    history.push({
      search: searchURLParameters.toString(),
    });
  });

  const updateQuery = useCallback(
    debounce((value: string) => {
      history.push({
        search: value,
      });
    }, 500),
    [],
  );

  const handleChange = (target: string) => {
    const trimedTarget = target.trim();

    setQuery(trimedTarget);
    searchURLParameters.set('query', trimedTarget);
    updateQuery(searchURLParameters.toString());
  };

  return (
    <>
      <input
        type="text"
        value={query}
        placeholder="Type something to search"
        onChange={({ target }) => handleChange(target.value)}
      />
      <table className="PeopleTable purpleHorizon">
        <thead>
          <tr>
            {tableHeader.map(tableHead => (
              <th key={tableHead} onClick={() => handleClickForSorting(tableHead)}>
                {tableHead}
                {searchTarget === tableHead.toLowerCase() && '*'}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visiblePeople.map(person => (
            <PersonRow
              key={person.id}
              person={person}
              searchTarget={searchURLParameters.toString()}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PeopleTable;
