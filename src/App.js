import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getUsers from './components/api/api';
import './App.css';
import PeopleTable from './components/PeopleTable/PeopleTable';

class App extends Component {
  async componentDidMount() {
    const { startLoading, finishLoading, setUsers } = this.props;
    startLoading();

    const defaultUsers = await getUsers();
    const users = defaultUsers.map((user, i) => ({
      ...user,
      id: i + 1,
      mother: user.mother || 'None',
      father: user.father || 'None',
      age: user.died - user.born,
      century: Math.ceil(user.died / 100),
      children: defaultUsers.filter(
        child => user.name === child.mother || user.name === child.father
      ),
    }));

    setUsers(users);
    finishLoading();
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div className="container">
        {isLoading ? <div>Loading</div> : <PeopleTable />}
      </div>
    );
  }
}

App.propTypes = {
  startLoading: PropTypes.func.isRequired,
  finishLoading: PropTypes.func.isRequired,
  setUsers: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapState = ({ isLoading }) => ({
  isLoading,
});

const mapDispatch = dispatch => ({
  startLoading: () => dispatch({ type: 'START_LOADING' }),
  finishLoading: () => dispatch({ type: 'FINISH_LOADING' }),
  setUsers: users => dispatch({ type: 'SET_USERS', users }),
});

export default connect(
  mapState,
  mapDispatch
)(App);
