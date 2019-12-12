import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

const PeopleTable = (props) => {
  if (!props.people.length) {
    return [];
  }

  const peopleCopy = () => (
    props.people.map(item => ({
      ...item,
      age: item.died - item.born,
      century: Math.ceil(item.died / 100),
    }))
  );

  const newPeople = peopleCopy();

  const head = [...Object.keys(newPeople[0])];

  const sortTable = (event) => {
    const column = event.target.textContent;

    const prevArr = [...newPeople];
    const sortArray = newPeople.sort((a, b) => {
      switch (typeof a[column]) {
        case 'string':
          return a[column] > b[column] ? 1 : -1;
        case 'number':
          return a[column] - b[column];
        default:
          return 0;
      }
    });

    if (prevArr[0][column] === sortArray[0][column]) {
      sortArray.reverse();
    }

    props.sortPeople(sortArray);
  };

  return (
    <table
      border="1"
      className="people-table"
    >
      <thead>
        <tr>
          {head.map(item => (
            <th
              key={item}
              onClick={sortTable}
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {<Person
          people={newPeople}
          selectText={props.selectText}
        />}
      </tbody>
    </table>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf.isRequired,
  selectText: PropTypes.string.isRequired,
  sortPeople: PropTypes.func.isRequired,
};

export default PeopleTable;
