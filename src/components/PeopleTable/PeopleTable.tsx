import React, { FC, useState, useEffect } from 'react';
import { PeopleListInterface } from '../../interfaces';

import './PeopleTable.css';

interface PeopleTableProps {
  people: PeopleListInterface;
}

export const PeopleTable: FC<PeopleTableProps> = ({ people }) => {

  return (
    <table className="PeopleTable">
      <thead>...</thead>
      <tbody>...</tbody>
    </table>
  );
};
