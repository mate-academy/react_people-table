import React, { FC } from 'react';
import { PersonType } from '../interfaces/interfaces';
import { PeopleTableHead } from '../PeopleTableHead/PeopleTableHead';
import { PeopleTableBody } from '../PeopleTableBody/PeopleTableBody';
import { SearchBar } from '../SearchBar/SearchBar';

interface PeopleTableProps {
  people: PersonType[];
}

export const PeopleTable: FC<PeopleTableProps> = (props) => {
  const { people } = props;

  return (
    <>
      <SearchBar />
      <table
        className="table table-hover"
        style={{ borderCollapse: 'collapse' }}
      >
        <PeopleTableHead />
        <PeopleTableBody people={people} />
      </table>
    </>
  );
};
