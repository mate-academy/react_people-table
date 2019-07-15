import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appPropTypes } from './components/propTypes';

import getUsers from './components/api/api';
import './App.css';
import PeopleTable from './components/PeopleTable/PeopleTable';
import NewPerson from './components/NewPerson/NewPerson';

class App extends Component {
  componentDidMount() {
    this.loadData();
  }

  loadData = async() => {
    const {
      startLoading,
      finishLoading,
      setUsers,
      setUsersToShow,
    } = this.props;

    startLoading();
    let users = await getUsers();
    users = users.map((user, i) => ({
      ...user,
      id: i + 1,
      mother: user.mother || 'None',
      father: user.father || 'None',
      age: user.died - user.born,
      century: Math.ceil(user.died / 100),
      children: users.filter(
        child => user.name === child.mother || user.name === child.father
      ),
    }));

    setUsers(users);
    setUsersToShow(users);
    finishLoading();
  }

  render() {
    const { isLoading, isAddingNew } = this.props;
    return (
      <div className="container">
        {isLoading ? 'Loading' : <PeopleTable />}
        {isAddingNew && <NewPerson />}
      </div>
    );
  }
}

App.propTypes = appPropTypes;

const mapState = ({ isLoading, isAddingNew }) => ({
  isLoading,
  isAddingNew,
});

const mapDispatch = dispatch => ({
  startLoading: () => dispatch({ type: 'START_LOADING' }),
  finishLoading: () => dispatch({ type: 'FINISH_LOADING' }),
  setUsers: users => dispatch({ type: 'SET_USERS', users }),
  setUsersToShow: users => dispatch({ type: 'SET_USERS_TO_SHOW', users }),
});

export default connect(
  mapState,
  mapDispatch
)(App);
