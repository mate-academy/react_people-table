import React from 'react';
import './style.scss';
import peopleFromServer from './people';
import PeopleTable from './components/PeopleTable';

let counter = 1;
const preparedPeople = peopleFromServer.map(person => ({
  // eslint-disable-next-line
  id: counter++,
  ...person,
  father: person.father || '',
  mother: person.mother || '',
  age: person.died - person.born,
  century: Math.ceil(person.died / 100),
  children: person.sex === 'm'
    ? peopleFromServer.filter(child => child.father === person.name)
      .map(child => child.name)
    : peopleFromServer.filter(child => child.mother === person.name)
      .map(child => child.name),
}));

class App extends React.Component {
  state = { inputNameValue: '' }

  render() {
    const inputName = this.state.inputNameValue.toLowerCase();
    const people = this.state.inputNameValue
      ? preparedPeople.filter(person => person.name.toLowerCase()
        .includes(inputName)
        || person.father.toLowerCase().includes(inputName)
        || person.mother.toLowerCase().includes(inputName))
      : preparedPeople;

    return (
      <div className="App">
        <section className="header">
          <h1>People table</h1>
          <input
            className="header__input"
            type="text"
            placeholder="Search by name"
            value={this.state.inputNameValue}
            onChange={
              event => this.setState({ inputNameValue: event.target.value })
            }
          />
        </section>

        <PeopleTable people={people} />
      </div>
    );
  }
}

export default App;
