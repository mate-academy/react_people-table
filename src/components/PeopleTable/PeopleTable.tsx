import React from 'react';
import { ModifiedPerson } from '../../helpers/api';
import PersonRow from '../PersonRow/PersonRow';
import TableHeaderRow from '../TableHeaderRow/TableHeaderRow';
import './PeopleTable.css';

type Props = {
  people: ModifiedPerson[];
}

const PeopleTable:React.FC<Props> = ({ people }) => {
  const headers = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table className="people-table">
      <thead>
        <TableHeaderRow headers={headers} />
      </thead>
      <tbody>
        {people.map((person: ModifiedPerson) => (
          <PersonRow person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  )
}

export default PeopleTable;
