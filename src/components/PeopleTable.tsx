import React, { useEffect, useState } from 'react';
import { getPeople } from '../helpers/api';
import PersonRow from './PersonRow';


const PeopleTable = () => {
  const headTitle = ['name', 'sex', 'born', 'died', 'mother', 'father'];
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(peopleFromServer => {
      const preparedPeopleList = peopleFromServer
        .map(person => {
          return {
            ...person,
            mother: peopleFromServer.find(({ name }) => name === person.motherName),
            father: peopleFromServer.find(({ name }) => name === person.fatherName),
          };
        });

      setPeople(preparedPeopleList);
    });
  }, []);

  return (
    <table className="table is-striped is-fullwidth">
      <thead>
        <tr>
          {headTitle.map(title => (
            <th key={title}>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <PersonRow
            key={person.name}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
