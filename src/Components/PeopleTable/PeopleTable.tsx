import React from 'react';
import { Person } from '../../helpers';
import { InputSearch } from '../InputSearch/InputSearch';
import { PersonRow } from '../PersonRow/PersonRow';

import './PeopleTable.scss';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <div className="people__container">
    <h1>People Table</h1>
    <InputSearch />
    <div className="people__table">
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Age</th>
          <th>Century</th>
          <th>Father</th>
          <th>Mother</th>
        </tr>
        {people.map(({
          name, sex, born, died, fatherName, motherName, slug,
        }, index) => (
          <PersonRow
            index={index + 1}
            name={name}
            sex={sex}
            born={born}
            died={died}
            father={fatherName}
            mother={motherName}
            slug={slug}
          />
        ))}
      </table>
    </div>
  </div>
);
