import React from 'react';
import './App.css';
import getPeople from './api/api';
import PeopleTable from './components/PeopleTable';

class App extends React.Component {
  state = {
    people: [],
    activePage: 1,
    sortType: 'id',
    sortDirection: 1, // 1 = 'asc', // 2 = desc
  };

  urlParams = (
    `?_limit=${this.state.tableItemsAmount}
    &_page=${this.state.activePage}
    &_sort=${this.state.sortType}
    &_order=${this.state.sortDirection === 1 ? 'asc' : 'desc'}`);

  async componentDidMount() {
    await getPeople()
      .then((peopleData) => {
        this.setState(
          { people: peopleData },
        );
      });
  }

  render() {
    return (
      <PeopleTable peopleData={this.state.people} />
    );
  }
}

export default App;
