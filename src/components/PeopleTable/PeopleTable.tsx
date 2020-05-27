import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import debounce from 'lodash/debounce';
import { useHistory } from 'react-router-dom';

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

  useMemo(() => {
    const father = 'fatherName';
    const mother = 'motherName';

    switch (searchTarget) {
      case 'died':
      case 'born':
      case 'age':
      case 'century':
        sortedPeople.sort((a, b) => (a[searchTarget] - b[searchTarget]));
        break;
      case 'name':
      case 'sex':
        sortedPeople.sort((a, b) => (a[searchTarget].localeCompare(b[searchTarget])));
        break;
      case 'father':
        sortedPeople.sort((a, b) => (a[father].localeCompare(b[father])));
        break;
      case 'mother':
        sortedPeople.sort((a, b) => (a[mother].localeCompare(b[mother])));
        break;
      default:
        break;
    }

    if (query.length > 0) {
      sortedPeople.filter(person => (
        (person.name + person.father + person.mother)
          .toLowerCase()
          .includes(searchTarget.toLowerCase())));
    }
  }, [sortedPeople, searchTarget, query]);

  const handleClickForSorting = ((target: string) => {
    const lowerCaseTarget = target.toLowerCase();

    setSearchTarget(lowerCaseTarget);

    history.push({
      search: `query=${lowerCaseTarget}`,
    });
  });

  const updateQuery = useCallback(
    debounce((value: string) => {
      history.push({
        search: `query=${value}`,
      });
    }, 500),
    [],
  );

  const handleChange = (target: string) => {
    setQuery(target);

    updateQuery(target.trim());
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
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedPeople.map(person => (
            <PersonRow key={person.id} person={person} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PeopleTable;
