import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './PeopleTable.css';
import Person from '../Person/Person';

const PeopleTable = ({
  usersToShow,
  filterUsers,
  sortUsers,
  isAddingNew,
  addNewPerson,
}) => {
  const tableHeaders = [
    { id: 1, name: 'Id' },
    { id: 2, name: 'Name' },
    { id: 3, name: 'Sex' },
    { id: 4, name: 'Age' },
    { id: 5, name: 'Century' },
    { id: 6, name: 'Born' },
    { id: 7, name: 'Died' },
    { id: 8, name: 'Mother' },
    { id: 9, name: 'Father' },
    { id: 10, name: 'Children' },
  ];

  return (
    <div className="">
      <h1 className="app-header">
        {usersToShow.length
          ? `${usersToShow.length} people found`
          : 'People not found'}
      </h1>
      {isAddingNew || (
        <button
          type="button"
          className="adding-button"
          onClick={addNewPerson}
        >
          Add a new person
        </button>
      )}
      <input
        type="text"
        className="table-search"
        placeholder="Search by name, mother`s or father`s name"
        onChange={event => filterUsers(event.target.value)}
        readOnly={isAddingNew}
      />
      <table className="table">
        <thead>
          <tr className="table__header">
            {tableHeaders.map(header => (
              <th
                key={header.id}
                onClick={() => sortUsers(header.name.toLowerCase())}
              >
                {header.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {usersToShow.map(user => (
            <Person key={user.id} person={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

PeopleTable.propTypes = {
  usersToShow: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterUsers: PropTypes.func.isRequired,
  sortUsers: PropTypes.func.isRequired,
  isAddingNew: PropTypes.bool.isRequired,
  addNewPerson: PropTypes.func.isRequired,
};

const mapState = ({ usersToShow, isAddingNew }) => ({
  usersToShow,
  isAddingNew,
});

const mapDispatch = dispatch => ({
  filterUsers: value => dispatch({ type: 'FILTER_USERS', value }),
  sortUsers: field => dispatch({ type: 'SORT_USERS', field }),
  addNewPerson: () => dispatch({ type: 'TOGGLE_ADDING_NEW' }),
});

export default connect(
  mapState,
  mapDispatch
)(PeopleTable);