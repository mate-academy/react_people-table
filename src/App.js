import React from 'react';
import PeopleTable from './Components/PeopleTable';
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
      </div>
    );
  }
}

export default App;
