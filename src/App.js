import React, { Component } from 'react';
import { tableData } from './services/TableData';
import PeopleTable from './components/peopleTable/PeopleTable';
import InputFilter from './components/inputFilter/InputFilter';
import SortingButtons from './components/sortingButtons/SortingButtons';
import { createSelector } from 'reselect';

export default class App extends Component {

  state = {
    tableInfo: [],
    filter: '',
    sortType: '',
  }

  loadData = async () => {
    Promise.all([tableData])
      .then(([table]) => {
        table.forEach((item, index) => {
          item.id = index+1;
          item.century = Math.ceil(item.died / 100);
          item.age = item.died - item.born;
          item.children = (table.filter(child => child.mother === item.name || child.father === item.name) || {name: ''});
        });
        this.setState({
          tableInfo: table,
        });
      });
  }

  componentDidMount() {
    this.loadData();
  }

  getFullTable = state => state.tableInfo;
  getFilteredTable = state => state.filter;
  getSortedTable = state => state.sortType;

  filteredPeople = createSelector(
    [
      this.getFullTable,
      this.getFilteredTable,
      this.getSortedTable,
    ],
    (fullTable, filterOption, sortOption) => {
      const filteredTable = fullTable.filter(person =>
        person.name.includes(filterOption)
        || String(person.mother).includes(filterOption)
        || String(person.father).includes(filterOption));

      switch(sortOption) {
        case `name`:
          return filteredTable.sort((a, b) => a.name.localeCompare(b.name));
        case `id`:
          return filteredTable.sort((a, b) => a - b);
        case `sex`:
          return filteredTable.sort((a, b) => a.sex.localeCompare(b.sex));
        case `born`:
          return filteredTable.sort((a, b) => a.born - b.born);
        case `died`:
          return filteredTable.sort((a, b) => a.died - b.died);
        case `age`:
          return filteredTable.sort((a, b) => a.age - b.age);
        case `century`:
          return filteredTable.sort((a, b) => a.century - b.century);
        default:
          return filteredTable;
      };
    }
  );

  sortBy = (type) => {
    this.setState({
      sortType: type,
    })
  }

  onChangeInput = (event) => {
    this.setState({
      filter: event.target.value
    });
  };

  render() {
    const filteredTable = this.filteredPeople(this.state)

    return (
      <>
        <SortingButtons sortBy={this.sortBy}/>
        <InputFilter
          changeInput={this.onChangeInput}
          input={this.state.filter}
        />
        <PeopleTable tableInfo={filteredTable} />
      </>
    );
  }
}
