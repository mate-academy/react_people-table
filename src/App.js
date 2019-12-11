import React from 'react';
import './App.css';
import Filter from './Filter';
import PeopleTable from './PeopleTable';
import people from './people';

class App extends React.Component {
  state = {
    peopleList: [...people],
    selectText: '',
    isSorted: false,
  }

  handleSearch = (search, inputText) => (
    this.setState({
      peopleList: search,
      selectText: inputText,
    })
  )

  setSortState = sortPeople => (
    this.setState(state => ({
      peopleList: sortPeople,
      isSorted: !state.isSorted,
    }))
  )

  render() {
    const { peopleList, selectText, isSorted } = this.state;

    return (
      <div className="App">
        <h1>People table</h1>
        <p>{`number of people - ${peopleList.length}`}</p>
        <PeopleTable
          people={peopleList}
          selectText={selectText}
          sortPeople={this.setSortState}
          isSorted={isSorted}
        />
        <Filter
          people={people}
          handleSearch={this.handleSearch}
        />
      </div>
    );
  }
}

export default App;
