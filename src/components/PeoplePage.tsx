import React from 'react';
import { PeopleTable } from './PeopleTable';
import { InputFilter } from './InputFilter';

export const PeoplePage = () => {
  return (
    <>
      <h2>People Table</h2>
      <InputFilter />
      <PeopleTable />
    </>
  );
};
