import React from 'react';
import THead from './THead/THead';
import TBody from './TBody/TBody';
import './Table.scss';

type Props = {
  people: PersonWithId[];
};

const Table: React.FC<Props> = ({ people }) => (
  <>
    <h1>People</h1>
    <table className="table">
      <THead />
      <tbody>
        {people.map(person => (
          <TBody
            person={person}
            key={person.id}
          />
        ))}
      </tbody>
    </table>
  </>
);

export default Table;
