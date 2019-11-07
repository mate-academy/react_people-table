import React from 'react';
import PropTypes from 'prop-types';

import Person from '../person/Person';
import NewPerson from '../newperson/NewPerson';
import SortingButtons from '../sort/SortingButtons';

const PeopleTable = (props) => {
  const {
    selectPerson,
    inputValueChange,
    changeSortType,
    filterSortList,
    addNewUser,
  } = props;

  return (
    <>
      <NewPerson addNewUser={addNewUser} />
      <SortingButtons  changeSortType={changeSortType} />
      <div className='filter'>
        <input type='text' placeholder="Write filter text" onChange={inputValueChange} />
      </div>
      <table className="PeopleTable">
        <thead>
          <th>Id</th>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Father</th>
          <th>Mother</th>
          <th>Age</th>
          <th>Century</th>
          <th>Children</th>
        </thead>
        <tbody>
          {filterSortList.map(person => <Person person={person} selectPerson={selectPerson} key={person.id}/>)}
        </tbody>
      </table>
    </>
  )
}

PeopleTable.propTypes = {
  peopleList: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectPerson: PropTypes.func.isRequired,
}

export default PeopleTable;
