import React from 'react'

import './PeopleTable.css'
import Person from '../Person/Person'

const PeopleTable = ({
  people,
  handleInputChange,
  handleSort,
  handleRowClick,
  selectedRow,
  handleButtonClick,
  isUserAdding,
}) => {
  const tableHeaders = [
    'Id',
    'Name',
    'Sex',
    'Age',
    'Century',
    'Born',
    'Died',
    'Mother',
    'Father',
    'Children',
  ]
  return (
    <div>
      <h1 className="align-center">
        {people.length ? `${people.length} people found` : 'People not found'}
      </h1>
      {isUserAdding || (
        <button
          type="button"
          className="action-button"
          onClick={handleButtonClick}
        >
          Add a new user
        </button>
      )}
      <input
        type="text"
        className="search-field"
        placeholder="Search by name, mother`s or father`s name"
        onChange={handleInputChange}
      />
      <table className="table-list">
        <thead>
          <tr className="table-header">
            {
              tableHeaders.map(key => (
                <th onClick={() => handleSort(key.toLowerCase())}>{key}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            people.map(person => (
              <Person
                key={person.id}
                person={person}
                onRowClick={handleRowClick}
                selectedRow={selectedRow}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default PeopleTable
