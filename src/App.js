/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import getUsers from './components/api/api';
import { finishLoading } from './components/redux/loading';
import { setUsers } from './components/redux/users';
import PeopleTable from './components/PeopleTable/PeopleTable';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.loadData();
  }

  loadData = async() => {
    const { finishLoading, setUsers } = this.props;

    const data = await getUsers();
    const users = data
      .map((user, i) => ({
        id: i + 1,
        ...user,
        age: user.died - user.born,
        century: Math.ceil(user.died / 100),
      }))
      .map((user, _i, people) => ({
        ...user,
        children: people.filter(
          child => child.father === user.name || child.mother === user.name
        ),
      }));

    setUsers(users);
    finishLoading();
  };

  render() {
    const { isLoading } = this.props;
    return (
      <section className="container">
        {isLoading ? (
          <h1 className="container-header">Loading..</h1>
        ) : (
          <PeopleTable />
        )}
      </section>
    );
  }
}

App.propTypes = {
  finishLoading: PropTypes.func.isRequired,
  setUsers: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapState = ({ isLoading }) => ({ isLoading });
const mapDispatch = { finishLoading, setUsers };
export default connect(
  mapState,
  mapDispatch
)(App);
