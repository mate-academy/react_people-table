import React, { Component } from 'react';
import PeopleTable from './component/peopleTable/PeopleTable';
import { allData } from './component/helper/Helper';
import './App.css';

class App extends Component {
  state = {
    people: [],
    sortMethod: 'id',
    search: '',
  }

  componentDidMount() {
    this.getData();
  }

  onSort = (sortMethod) => {
    this.setState({
      sortMethod,
    });
  }

  getData = async() => {
    const people = await allData();
    let id = 0;

    this.setState({
      people: people.map((item) => {
        id += 1;

        return ({
          id,
          ...item,
          age: item.died - item.born,
          century: Math.ceil(item.died / 100),
        });
      }),
    });
  }

  searching = (e) => {
    this.setState({
      search: e.target.value,
    });
  }

  render() {
    return (
      <div className="App">
        <span>
          Visible people:
          {this.state.people.length}
        </span>
        <input
          type="text"
          className="ui input focus"
          placeholder="SEARCH HERE"
          onChange={this.searching}
        />
        <PeopleTable
          people={this.state.people}
          onSort={this.onSort}
          sortMethod={this.state.sortMethod}
          search={this.state.search}
        />
      </div>
    );
  }
}

export default App;
