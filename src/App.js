import React from 'react';
import './App.css';
import Filter from './Filter';
import PeopleTable from './PeopleTable';
import people from './people';

class App extends React.Component {
  state = { people: [...people] }

  handleSearch = search => (
    this.setState({ people: search })
  )

  render() {
    return (
      <div className="App">
        <h1>People table</h1>
        <p>{`number of people - ${this.state.people.length}`}</p>
        <PeopleTable people={this.state.people} />
        <Filter
          people={people}
          handleSearch={this.handleSearch}
        />
      </div>
    );
  }
}

export default App;
