import React, { useEffect, useState } from 'react';
import { getPeople } from '../helpers/api';
import { PersonRow } from './PersonRow';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);

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

  const headers = ['ID', 'Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table className="PeopleTable table">
      <thead>
        <tr className="thead-light">
          {headers.map(header => (
            <th scope="col" key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <PersonRow people={people} />
      </tbody>
    </table>
  );
};
