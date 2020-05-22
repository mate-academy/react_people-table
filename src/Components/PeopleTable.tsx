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

  return (
    <table className="PeopleTable table">
      <thead>
        <tr className="thead-light">
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Sex</th>
          <th scope="col">Born</th>
          <th scope="col">Died</th>
          <th scope="col">Mother</th>
          <th scope="col">Father</th>
        </tr>
      </thead>
      <tbody>
        <PersonRow people={people} />
      </tbody>
    </table>
  );
};
