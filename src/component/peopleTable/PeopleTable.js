import React from 'react';
import PropTypes from 'prop-types';
import TableItem from '../tableItem/TableItem';
import Sorting from '../sorting/Sorting';

function PeopleTable({
  sortMethod, people, onSort, search,
}) {
  let sortedList = [];
  let searchedList = [];

  switch (sortMethod) {
    case 'id':
      sortedList = [...people]
        .sort((a, b) => a.id - b.id);
      break;
    case 'sex':
      sortedList = [...people]
        .sort((a, b) => a.sex.localeCompare(b.sex));
      break;
    case 'name':
      sortedList = [...people]
        .sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'age':
      sortedList = [...people]
        .sort((a, b) => b.age - a.age);
      break;
    case 'born':
      sortedList = [...people]
        .sort((a, b) => b.born - a.born);
      break;
    case 'died':
      sortedList = [...people]
        .sort((a, b) => a.died - b.died);
      break;
    case 'century':
      sortedList = [...people]
        .sort((a, b) => a.century - b.century);
      break;
    default:
      sortedList = [...people];
  }

  searchedList = [...sortedList]
    .filter(person => person.name.toLowerCase().includes(search)
      || (person.mother ? person.mother.toLowerCase() : '').includes(search)
      || (person.father ? person.father.toLowerCase() : '').includes(search));

  return (
    <>
      <Sorting onSort={onSort} />
      <table className="peopleTable ui celled table">
        <thead>
          <tr>
            <th>id</th>
            <th>Sex</th>
            <th>Name</th>
            <th>Age</th>
            <th>Born</th>
            <th>Died</th>
            <th>Mother</th>
            <th>Father</th>
            <th>Century</th>
          </tr>
        </thead>
        <tbody>
          {searchedList
            .map(person => <TableItem key={person.id} man={person} />)}
        </tbody>

      </table>
    </>
  );
}

PeopleTable.propTypes = {
  sortMethod: PropTypes.string.isRequired,
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSort: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};

export default PeopleTable;
