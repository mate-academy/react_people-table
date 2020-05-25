import React from 'react';
import { People } from './interface';
import PersonRow from './PersonRow';

type Props = {
  people: People[];
};

const paramOfPeople = ['name', 'sex', 'born', 'died', 'mother', 'father'];


const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <>
      <table className="PeopleTable">
        <tr>
          {paramOfPeople.map(item => <th>{item}</th>)}
        </tr>
        <PersonRow people={people} />
      </table>
    </>
  );
};

export default PeopleTable;
