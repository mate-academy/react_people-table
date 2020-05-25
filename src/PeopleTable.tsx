import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getPreparedPeople } from './api';
import PersonRow from './PersonRow';


const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const history = useHistory();
  const location = useLocation();
  const headOfTable = ['id', 'name', 'sex', 'born', 'died', 'age', 'father', 'mother', 'century'];

  useEffect(() => {
    getPreparedPeople().then((peopleFromServer) => {
      setPeople(peopleFromServer);
    });
  }, []);

  const searchParams = new URLSearchParams(location.search);
  const query: string = searchParams.get('query') || '';
  const pattern = new RegExp(query, 'i');
  const visiblePeople = people.filter(person => pattern.test(person.name));

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
              <th key={headItem}>
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
