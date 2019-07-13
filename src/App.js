import React from 'react';
import './App.css';

const getUsers = async () => {
  const data = await fetch('https://mate-academy.github.io/react_people-table/api/people.json')
    .then(response => response.json());
  const users = [];
  await data.forEach((item, i) => {
    users.push({...item, id: i + 1})
  });
  return users;
};

const User = ({ user }) => (
  <tr>
    <td>{user.id}</td>
    <td>{user.name}</td>
    <td>{user.sex}</td>
    <td>{user.born}</td>
    <td>{user.died}</td>
    <td>{user.mother}</td>
    <td>{user.father}</td>
  </tr>
);

const PeopleTable = ({ users }) => (
  <table className="people-table">
    <thead>
    <tr>
      <th>ID</th>
      <th>name</th>
      <th>sex</th>
      <th>born</th>
      <th>died</th>
      <th>mother</th>
      <th>father</th>
    </tr>
    </thead>
    <tbody>
    {users.map(user => (
      <User user={user}/>
    ))}
    </tbody>
  </table>
);

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
        <h1>{this.state.peoples.length}</h1>
        <PeopleTable users={this.state.peoples}/>
        <button onClick={this.getData}>button</button>
      </div>
    );
  }
}

export default App;
