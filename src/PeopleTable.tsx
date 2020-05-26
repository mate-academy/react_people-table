import React, { useEffect, useState, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getPreparedPeople } from './api';
import PersonRow from './PersonRow';


const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const sortBy = useMemo(() => searchParams.get('sortBy') || '', [searchParams]);
  const sortOrder = useMemo(() => searchParams.get('sortOrder') || '', [searchParams]);
  const headOfTable = ['id', 'name', 'sex', 'born', 'died', 'age', 'father', 'mother', 'century'];

  useEffect(() => {
    getPreparedPeople().then((peopleFromServer) => {
      setPeople(peopleFromServer);
    });
  }, []);


  const query: string = searchParams.get('query') || '';
  const pattern = new RegExp(query, 'i');
  const visiblePeople = people
    .filter(person => pattern.test(person.name + person.fatherName + person.motherName));


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
  },
  [visiblePeople, sortBy]);

  useMemo(() => {
    switch (sortOrder) {
      case 'desc':
        visiblePeople.reverse();
        break;
      default:
    }
  },
  [visiblePeople, sortOrder]);

  return (
    <>
      <input
        type="text"
        className="input"
        value={query}
        placeholder="whom you search"
        onChange={(event) => {
          history.push({
            search: `?query=${event.target.value}`,
          });
        }}

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
