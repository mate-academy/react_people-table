import React from 'react';
import THead from '../THead/THead';
import TBody from '../TBody/TBody';
import './PeoplePage.scss';

type Props = {
  people: PersonWithParents[];
};

const PeoplePage: React.FC<Props> = ({ people }) => {
  return (
    <div className="peoplePage">
      <h1 className="peoplePage__head">People Table</h1>

      <table className="peoplePage__wrapper">
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
    </div>
  );
};

export default PeoplePage;
