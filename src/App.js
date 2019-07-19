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
    visibleUsers: [],
    searchValue: '',
  };

  async componentDidMount() {
    const users = await getUsers();
    this.setState({
      peoples: users,
      visibleUsers: [...users],
    });
  }

  searchFilter = (event) => {
    const { value } = event.target;
    this.setState(prevState => ({
      searchValue: value,
      visibleUsers: prevState.peoples
        .filter(user => [user.name, user.mother, user.father]
          .join('')
          .toLowerCase()
          .includes(value.toLowerCase())),
    }));
  };

  sortingHandle = (sortValue) => {
    console.log(sortValue);
    this.setState(prevState => ({
      visibleUsers: prevState.visibleUsers.sort((a, b) => (a[`${sortValue}`] > b[`${sortValue}`]) ? 1 : -1),
    }));
  };

  render() {
    return (
      <div className="App">
        <h1 onClick={() => {console.log(this.state.visibleUsers)}}>Number of users {this.state.peoples.length}</h1>
        <div>
          <input className="search-input"
                 onChange={this.searchFilter}
          />
        </div>
        <PeopleTable
          users={this.state.visibleUsers}
          inputValue={this.state.searchValue}
          sortingHandle={this.sortingHandle}
        />
      </div>
    );
  }
}

export default App;
