/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { prepareUsers, setFilter, setSort } from '../redux/users';
import titles from '../api/titles';
import Person from '../Person/Person';

const PeopleTable = ({ users, setFilter, setSort }) => (
  <>
    <h1 className="container-header">
      {users.length ? `${users.length} people found` : 'People not found'}
    </h1>
    <form>
      <label htmlFor="search-field">
        <input
          id="search-field"
          type="text"
          className="search-field"
          placeholder="Search by name, mother`s or father`s name"
          onChange={e => setFilter(e.target.value)}
        />
      </label>
    </form>
    <table className="table">
      <thead>
        <tr className="table__header">
          {titles.map(title => (
            <th
              onClick={() => setSort(title.name.toLowerCase())}
              key={title.id}
              name={title.name}
            >
              {title.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <Person key={user.id} person={user} />
        ))}
      </tbody>
    </table>
  </>
);

PeopleTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setSort: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};

const mapState = ({ users }) => ({
  users: prepareUsers(
    users.users,
    users.filterField,
    users.sortField,
    users.sortDirection
  ),
});

const mapDispatch = {
  setFilter,
  setSort,
};

export default connect(
  mapState,
  mapDispatch
)(PeopleTable);
