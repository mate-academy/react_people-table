import React, { useEffect, useState } from 'react';
import { getPreparedPeople } from './api';
import PersonRow from './PersonRow';

const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const headOfTable = ['id', 'name', 'sex', 'born', 'died', 'age', 'father', 'mother', 'century'];

  useEffect(() => {
    getPreparedPeople().then((peopleFromServer) => {
      setPeople(peopleFromServer);
    });
  }, []);

  return (
    <>
      <h2>People Page</h2>
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
          <PersonRow people={people} />
        </tbody>
      </table>
    </>
  );
};

export default PeopleTable;
