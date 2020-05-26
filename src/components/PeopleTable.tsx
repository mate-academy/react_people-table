import React, { useEffect, useState, useMemo } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { getPeople } from './api';
import { PersonRow } from './PersonRow';
import { InputFilter } from './InputFilter';



type Props = RouteComponentProps<{
  location: string;
}>;

export const PeopleTable: React.FC<Props> = ({ location }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const query = useMemo(() => searchParams.get('query'), [searchParams]) || '';
  const sortBy = useMemo(() => searchParams.get('sortBy'), [searchParams] || '');
  const sortOrder = useMemo(() => searchParams.get('sortOrder'), [searchParams] || '');
  const tableHeads = [
    'name',
    'sex',
    'born',
    'died',
    'mother',
    'father',
  ];

  useEffect(() => {
    getPeople().then(res => setPeople(
      res.map((person, i) => ({
        ...person,
        id: i + 1,
        father: person.fatherName ? person.fatherName : 'NOT FOUND',
        mother: person.motherName ? person.motherName : 'NOT FOUND',
      })),
    ));
  }, []);

  const filterPeople = (peopleArr: Person[]) => {
    const pattern = new RegExp(query, 'i');

    return peopleArr
      .filter(person => pattern.test(person.name + person.motherName + person.fatherName));
  };


  const preparedPeople = useMemo(() => filterPeople(people), [people, query]);

  useMemo(() => {
    switch (sortBy) {
      case 'born':
      case 'died':
        preparedPeople.sort((a, b) => a[sortBy] - b[sortBy]);
        break;
      case 'name':
      case 'sex':
      case 'mother':
      case 'father':
        preparedPeople.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
        break;
      default:
    }
  },
  [preparedPeople, sortBy, sortOrder]);


  const handlePeopleSort = (column: string) => {
    if (sortBy === column && sortOrder === 'asc') {
      searchParams.set('sortOrder', 'desc');
    } else {
      searchParams.set('sortOrder', 'asc');
    }

    searchParams.set('sortBy', column);
    history.push({
      search: searchParams.toString(),
    });
  };

  useMemo(() => {
    return sortOrder === 'desc' ? preparedPeople.reverse() : preparedPeople;
  },
  [preparedPeople, sortOrder]);

  return (
    <>
      <h2>People Table</h2>
      <InputFilter />
      <table className="peopleTable">
        <thead className="table-success">
          <tr>
            {tableHeads.map(item => (
              <th
                key={item}
                onClick={() => handlePeopleSort(item)}
              >
                {item}
                {sortBy === item && (
                  <>*</>
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
