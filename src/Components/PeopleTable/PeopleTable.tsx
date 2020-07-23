import React, { FC } from 'react';
import { PersonType } from '../interfaces/interfaces';
import { PeopleTableHead } from '../PepleTableHead/PepleTableHead';
import PeopleTableBody from '../PeopleTableBody/PeopleTableBody';

interface PeopleTableProps {
  people: PersonType[];
}

export const PeopleTable: FC<PeopleTableProps> = (props) => {
  const { people } = props;

  return (
    <table
      className="table table-hover"
      style={{ borderCollapse: 'collapse' }}
    >
      <PeopleTableHead />
      <PeopleTableBody people={people} />
    </table>
  );
};
