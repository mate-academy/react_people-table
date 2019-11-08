import React, { Component } from 'react';
import './App.css';
import { Button } from 'semantic-ui-react';
import { createSelector } from 'reselect';
import loadedPeople from './components/Api';
import Load from './components/Load';
import ButtonGroup from './components/ButtonGroup';
import InputForm from './components/InputForm';
import DataTable from './components/DataTable';

class App extends Component {
  cashTable = createSelector(
    [
      state => state.initialTable,
      state => state.sortValue,
      state => state.inputValue,
    ],
    (initialTable, filterValue, inputValue) => {
      const inputValueLow = inputValue ? inputValue.toLowerCase() : inputValue;
      const filterTable = initialTable
        .filter(
          person => person.name.toLowerCase().includes(inputValueLow)
            || (person.mother ? person.mother.toLowerCase() : '').includes(inputValueLow)
            || (person.father ? person.father.toLowerCase() : '').includes(inputValueLow)
        );

      const sortedTable = filterTable.sort((a, b) => {
        switch (filterValue) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'id':
            return a.id - b.id;
          case 'sex':
            return a.sex.localeCompare(b.sex);
          case 'born':
            return a.born - b.born;
          case 'died':
            return a.died - b.died;
          case 'age':
            return a.age - b.age;
          case 'century':
            return a.century - b.century;
          default:
            return a.id - b.id;
        }
      });

      return sortedTable;
    }
  );

  constructor(props) {
    super(props);

    this.state = {
      initialTable: null,
      currentTable: null,
      sortValue: null,
      inputValue: '',
      loading: false,
    };
  }

  showList = async() => {
    this.setState({
      loading: true,
    });

    const peopleData = await loadedPeople();
    const people = peopleData.map((person, index) => ({
      ...person,
      id: index + 1,
      age: person.died - person.born,
      century: (Math.ceil(person.died / 100)),
    }));

    this.setState({
      initialTable: people,
      currentTable: people,
    });
  };

  filtering = (val) => {
    if (val) {
      this.setState({
        inputValue: val,
      });
    }
  }

  sortTable = (val) => {
    this.setState(prevState => ({
      ...prevState,
      sortValue: val,
    }));
  }

  render() {
    const { initialTable, loading } = this.state;

    if (initialTable === null) {
      if (loading) {
        return <Button size="massive" loading primary>Loading</Button>;
      }

      return <Load showList={this.showList} />;
    }

    return (
      <div className="wrapper">
        <InputForm filtering={this.filtering} />

        <ButtonGroup
          byName={() => this.sortTable('name')}
          byId={() => this.sortTable('id')}
          bySex={() => this.sortTable('sex')}
          byBorn={() => this.sortTable('born')}
          byDied={() => this.sortTable('died')}
          byAge={() => this.sortTable('age')}
          byCentury={() => this.sortTable('century')}
        />

        <DataTable
          people={this.cashTable(this.state)}
        />
      </div>
    );
  }
}

export default App;
