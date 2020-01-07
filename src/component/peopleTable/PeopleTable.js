import React from 'react';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';
import TableItem from '../tableItem/TableItem';
import Sorting from '../sorting/Sorting';

const sortList = (sortMethod, people) => {
  switch (sortMethod) {
    case 'id':
      return [...people]
        .sort((a, b) => a.id - b.id);
    case 'sex':
      return [...people]
        .sort((a, b) => a.sex.localeCompare(b.sex));
    case 'name':
      return [...people]
        .sort((a, b) => a.name.localeCompare(b.name));
    case 'age':
      return [...people]
        .sort((a, b) => b.age - a.age);
    case 'born':
      return [...people]
        .sort((a, b) => b.born - a.born);
    case 'died':
      return [...people]
        .sort((a, b) => a.died - b.died);
    case 'century':
      return [...people]
        .sort((a, b) => a.century - b.century);
    default:
      return [...people];
  }
};

const selectedList = createSelector(
  obj => obj.sortMethod,
  obj => obj.people,
  (s, p) => sortList(s, p)
);

function PeopleTable({
  sortMethod, people, onSort, search,
}) {
  let sortedList = [];
  let searchedList = [];

  sortedList = selectedList({ sortMethod, people });

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
            .map(person => <TableItem key={person.id} person={person} />)}
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
