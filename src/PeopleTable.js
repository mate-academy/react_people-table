import React from 'react';
import Person from './Person';
import './App.css';

const PeopleTable = ({ people, markedAPersonRow, markByClick }) => {
  const columnNames = ['id', 'name', 'sex', 'born', 'died', 'age', 'century', 'father', 'mother', 'children'];
  return (
    <table className="PeopleTable">
      <thead>
        <tr className="thead">
          {columnNames.map(columnName => (
            <th key={columnName}>{columnName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <Person
            key={person.id}
            person={person}
            columnNames={columnNames}
            markedAPersonRow={markedAPersonRow}
            markByClick={() => markByClick(person.id)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
