import React from 'react';
import './App.css';
import Filter from './Filter';
import PeopleTable from './PeopleTable';
import people from './people';

class App extends React.Component {
  state = {
    peopleList: [...people],
    selectText: '',
  }

  handleSearch = (search, inputText) => (
    this.setState({
      peopleList: search,
      selectText: inputText,
    })
  )

  setSortState = (sortPeople) => {
    this.setState({ peopleList: sortPeople });
  }

  render() {
    const { peopleList, selectText } = this.state;

    return (
      <div className="App">
        <h1>People table</h1>
        <p>{`number of people - ${peopleList.length}`}</p>
        <PeopleTable
          people={peopleList}
          selectText={selectText}
          sortPeople={this.setSortState}
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
