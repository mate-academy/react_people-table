import React from 'react';
import { PeopleTable } from "./components/PeopleTable";
import peopleFormServer from './api/people.json'

class App extends React.Component {
  state = {
    people: [...peopleFormServer],
    query: "",
    sortBy: "",
    isReversed: false,
  }

  getVisiblePeople = ({ query, sortBy, isReversed, people }) => {
    let visiblePeople = people;

    if (query) {
      const lowerQuery = query.toLowerCase();

      visiblePeople = visiblePeople
        .filter(person => (person.name + person.born + person.died)
          .toLowerCase()
          .includes(lowerQuery))
    }

    if (sortBy) {
      visiblePeople = visiblePeople
        .sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1)
    }

    if (isReversed) {
      visiblePeople = [...visiblePeople].reverse();
    }

    return visiblePeople;
  }

  addRandomPerson = () => {
    this.setState((prevState) => ({
      people: [
        { name: "Denys Cheporniuk", sex: "m", born: 1998 },
        ...prevState.people,
      ],
    }));
  }

  reverse = () => {
    this.setState((prevState) => ({
      isReversed: !prevState.isReversed,
    }))
  }

  reset = () => {
    this.setState({
      people: [...peopleFormServer],
      query: "",
      sortBy: "",
      isReversed: false,
    })
  }

  render () {
    const { people, query, sortBy, isReversed } = this.state;
    const visiblePeople = this.getVisiblePeople(
      { people, query, sortBy, isReversed }
      );

    return (
      <div className="App">
        <h1>People table</h1>

        <button onClick={() => { this.setState({ sortBy: "name"})}}>
          sort by name
        </button>

        <button onClick={() => { this.setState({ sortBy: "born" })}}>
          sort by born
        </button>

        <button onClick={() => { this.setState({ sortBy: "died" })}}>
          sort by died
        </button>

        <button onClick={() => { this.setState({ sortBy: "father" })}}>
          sort by father
        </button>

        <button onClick={this.reverse}>
          reverse
        </button>

        <button onClick={this.reset}>
          reset
        </button>

        <button onClick={this.addRandomPerson}>
          add random person
        </button>

        <input
          type="text"
          value={query}
          onChange={(e) => {
            this.setState({
              query: e.target.value,
            })
          }}
        />

        <PeopleTable people={visiblePeople} />
      </div>
    )
  }
}

export default App;
