import React, { Component } from 'react';
import { createSelector } from 'reselect';
import PeopleTable from './components/PeopleTable/PeopleTable';
import Filter from './components/Filter/Filter';
// eslint-disable-next-line max-len
import SortingButtonGroup from './components/SortingButtonGroup/SortingButtonGroup';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      sortingType: '',
      tableData: [],
      URL: 'https://mate-academy.github.io/react_people-table/api/people.json',
    };
  }

  componentDidMount() {
    this.loadTable(this.state.URL);
  }

  getPeople = state => state.tableData;

  getFilter = state => state.filter;

  getSortingType = state => state.sortingType;

  getVisiblePeople = createSelector(
    [this.getPeople, this.getFilter, this.getSortingType],
    (people, filter, sortingType) => people.filter(person => (
      person.name.includes(filter)
      || person.name.includes(filter)
      || person.name.includes(filter)
    )).sort((a, b) => {
      if (a[sortingType] > b[sortingType]) { return 1; }

      return -1;
    })
  );

  loadTable = URL => fetch(URL)
    .then(response => response.json())
    .then((data) => {
      const peopleWithIds = data.map((person, index) => (
        { ...person, id: index + 1 }
      ));

      this.setState({ tableData: peopleWithIds });
    });

  onFilterChanged = (event) => {
    this.setState({ filter: event.target.value });
  };

  changeSortingType = (event) => {
    this.setState({ sortingType: event.target.dataset.sortingType });
  };

  render() {
    const visiblePeople = this.getVisiblePeople(this.state);

    return (
      <>
        <SortingButtonGroup changeSortingType={this.changeSortingType} />
        <Filter onFilterChanged={this.onFilterChanged} />
        <PeopleTable people={visiblePeople} />
      </>
    );
  }
}

export default App;
