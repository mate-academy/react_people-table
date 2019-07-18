import React from 'react';
import PeopleTable from './Components/PeopleTable';
import './App.css';

const getUsers = async() => {
  const data = await fetch('https://mate-academy.github.io/react_people-table/api/people.json')
    .then(response => response.json());
  return data.map((user, index) => {
    return {
      id: index + 1,
      ...user,
      age: user.died - user.born,
      century: Math.ceil(user.died / 100),
    };
  });
};

class App extends React.Component {
  state = {
    peoples: [],
  };

  async componentDidMount() {
    const users = await getUsers();
    this.setState({
      peoples: users,
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Number of users {this.state.peoples.length}</h1>
        <PeopleTable users={this.state.peoples} />
      </div>
    );
  }
}

export default App;
