import React from 'react';
import './App.css';

import getData from './api/getData';
import PeopleTable from './components/PeopleTable';

class App extends React.Component {
  state = {
    people: [],
  };

  async componentDidMount() {
    const peopleFromApi = await getData();

    this.setState({
      people: peopleFromApi,
    });
  }

  render() {
    return (
      <main>
        <div className="App">
          <h1>People table</h1>
          <span>People in table - </span>
          {this.state.people.length}
        </div>

        <PeopleTable
          people={this.state.people}
          handleSearch={this.handleSearch}
        />

      </main>
    );
  }
}

export default App;
