import React, { Component } from 'react';
import { connect } from 'react-redux';
import getUsers from './api/api';
import './App.css';

class App extends Component {
  async componentDidMount() {
    const { startLoading, finishLoading, setUsers } = this.props;

    startLoading();
    const users = await getUsers();
    setUsers(users);
    finishLoading();
  }

  render() {
    const { isLoading, usersToShow } = this.props;

    return (
      <div>
        {isLoading ? 'Loading..' : usersToShow.length}
      </div>
    );
  }
}

const mapState = ({ isLoading, usersToShow }) => ({
  isLoading,
  usersToShow,
});

const mapDispatch = dispatch => ({
  startLoading: () => dispatch({ type: 'START_LOADING' }),
  finishLoading: () => dispatch({ type: 'FINISH_LOADING' }),
  setUsers: users => dispatch({ type: 'SET_USERS', users }),
});

export default connect(mapState, mapDispatch)(App);
