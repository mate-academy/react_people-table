import React from 'react';

import { PersonTable } from '../../interfaces/interfaces';
import PersonRow from '../PersonRow/PersonRow';

type Props = {
  people: PersonTable[];
};

const PeopleTable: React.FC<Props> = ({ people }) => {
  const peopleWithParents = people.map(person => ({
    ...person,
    father: people.find((parent) => parent.name === person.fatherName) || 'none',
    mother: people.find((parent) => parent.name === person.motherName) || 'none',
  }));

  return (
    <>
      <table className="PeopleTable purpleHorizon">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Father</th>
            <th>Mother</th>
            <th>Age</th>
            <th>Century</th>
          </tr>
        </thead>
        <tbody>
          {peopleWithParents.map(person => (
            <PersonRow key={person.id} person={person} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PeopleTable;
