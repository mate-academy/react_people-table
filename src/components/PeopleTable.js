import React from 'react';
import PersonRow from './PersonRow';
import Buttons from './Buttons';

export const PeopleTable = ({
  filterSortList, selectPerson, valueOnChange, inputValue, sortTypeChange,
}) => (
  <>
    <Buttons sortTypeChange={sortTypeChange} />
    <div className="ui icon input filter">
      <input
        type="text"
        value={inputValue}
        placeholder="Search by filter upside..."
        onChange={event => valueOnChange(event)}
      />
      <i aria-hidden="true" className="search icon" />
    </div>
    <table className="ui celled selectable table">
      <thead>
        <tr>
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
        </tr>
      </thead>

      <tbody>
        {filterSortList.map(person => (
          <PersonRow
            person={person}
            selectPerson={selectPerson}
          />
        ))}
      </tbody>
    </table>
  < />
);
