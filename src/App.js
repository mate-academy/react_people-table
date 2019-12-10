import React from 'react';
import './App.css';
import Filter from './Filter';
import PeopleTable from './PeopleTable';
import people from './people';

class App extends React.Component {
  state = { people: [...people] }

  handleName = (event) => {
    const inputText = event.target.value;
    const key = event.target.id;

    this.setState({
      people: people.filter(person => (
        person[key] !== null && person[key].includes(inputText))),
    });
  }

  render() {
    return (
      <div className="App">
        <h1>People table</h1>
        <p>{`number of people - ${this.state.people.length}`}</p>
        <PeopleTable people={this.state.people} />
        <Filter handleName={this.handleName} />
      </div>
    );
  }
}

export default App;
