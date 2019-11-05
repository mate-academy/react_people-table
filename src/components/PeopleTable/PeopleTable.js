import React from 'react';
import PropTypes from 'prop-types';

import Person from '../person/Person';
import Sort from '../sort/Sort';



class PeopleTable extends React.Component {
  render(){
    const {
      selectPerson,
      inputValueChange,
      inputValue,
      sortTypeChange,
      filterSortList,
    } = this.props;

    return (
      <>
        <Sort  sortTypeChange={sortTypeChange}/>
        <div className='filter'>
          <input type='text' value={inputValue} placeholder="Write filter text" onChange={(event) => inputValueChange(event)} />
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
            {filterSortList.map(person => <Person person={person} selectPerson={selectPerson} />)}
          </tbody>
        </table>
      </>
    )
  }
}

PeopleTable.propTypes = {
  peopleList: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectPerson: PropTypes.func.isRequired,
}

export default PeopleTable;
