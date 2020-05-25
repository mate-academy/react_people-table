import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { PersonRow } from './PersonRow';

type PeopleList = {
  people: Person[];
};

export const PeopleTable = ({ people }: PeopleList) => {
  const PeopleTableHeader = ['Id', 'Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];
  const match = useRouteMatch<MatchParams>();
  const { personName } = match.params;

  return (
    <table className="table">
      <thead>
        <tr className="table-primary">
          {PeopleTableHeader.map(name => (
            <th>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people.map((person, index) => (
          <PersonRow personName={personName} index={index} person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
