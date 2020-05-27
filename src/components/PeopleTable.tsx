import React, { useState, useEffect } from 'react';
import { getPeople } from '../helpers/api';
import { PersonRow } from './PersonRow';

type Props = {
  people: PersonType[];
};

export const PeopleTable: React.FC<Props> = () => {
  const theads = [
    'ID',
    'Name',
    'Sex',
    'Born',
    'Died',
    'Father',
    'Mother',
  ];

  const [people, setPeople] = useState<PersonType[]>([]);

  useEffect(() => {
    getPeople()
      .then(data => setPeople(
        data.map((person: PersonWithParents, index: number) => {
          const mother = data.find(m => m.name === person.motherName);
          const father = data.find(f => f.name === person.fatherName);

          return {
            ...person,
            id: index + 1,
            motherSlug: mother?.slug || person.motherName,
            fatherSlug: father?.slug || person.fatherName,
          };
        }),
      ));
  }, []);

  return (
    <table className="PeopleTable people">
      <thead>
        <tr className="people__header">
          {theads.map((title: string) => (
            <th key={title}>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people.map((person) => (
          <PersonRow person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
