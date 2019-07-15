/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { peopleTablePropTypes } from '../propTypes';

import './PeopleTable.css';
import Person from '../Person/Person';
import { filterUsers, sortUsers } from '../redux/usersToShow';
import { startAdding } from '../redux/newPerson';

class PeopleTable extends Component {
  state = {
    sortDirection: false,
    selectedPersonId: -1,
  };

  handleSelectPerson = id => this.setState({ selectedPersonId: id });

  handleSort = (name) => {
    const { sortDirection } = this.state;
    const { sortUsers } = this.props;

    sortUsers(name, sortDirection);
    this.setState(prevState => ({
      sortDirection: !prevState.sortDirection,
    }));
  };

  render() {
    const {
      users,
      usersToShow,
      filterUsers,
      isAddingNew,
      startAdding,
    } = this.props;

    const titles = [
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
            className="action-button"
            onClick={startAdding}
          >
            Add a new person
          </button>
        )}
        <input
          type="text"
          className="table-search"
          placeholder="Search by name, mother`s or father`s name"
          onChange={(event) => {
            filterUsers(event.target.value, users);
          }}
          readOnly={isAddingNew}
        />
        <table className="table">
          <thead>
            <tr className="table__header">
              {titles.map(header => (
                <th
                  name={header.name}
                  key={header.id}
                  onClick={() => this.handleSort(header.name.toLowerCase())}
                >
                  {header.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usersToShow.map(user => (
              <Person
                key={user.id}
                person={user}
                selectedId={this.state.selectedPersonId}
                handlePersonClick={this.handleSelectPerson}
                titles={titles}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

PeopleTable.propTypes = peopleTablePropTypes;

const mapState = ({ usersToShow, isAddingNew, users }) => ({
  users,
  usersToShow,
  isAddingNew,
});

const mapDispatch = {
  filterUsers,
  sortUsers,
  startAdding,
};

export default connect(
  mapState,
  mapDispatch
)(PeopleTable);
