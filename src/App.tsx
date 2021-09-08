import React from 'react';
import { PeopleTable } from './components/PeopleTable';
import peopleFromServer from './api/people.json';

import './App.scss';

type State = {
  query: string;
  people: Person[];
};

class App extends React.Component<{}, State> {
  state: State = {
    query: '',
    people: [...peopleFromServer as Person[]],
  };

  getVisiblePeople = () => {
    const { query, people } = this.state;

    let visiblePeople = people;

    if (query) {
      const lowerQuery = query.toLowerCase();

      visiblePeople = people
        .filter(person => person.name.toLowerCase().includes(lowerQuery));
    }

    return visiblePeople;
  };

  render() {
    const { query } = this.state;

    const visiblePeople = this.getVisiblePeople();

    return (
      <div className="App">
        <h1>{`People table ${query}`}</h1>

        <input
          type="text"
          value={query}
          onChange={(e) => {
            this.setState({ query: e.target.value });
          }}
        />

        {visiblePeople.length !== 0 && (
          <PeopleTable people={visiblePeople} />
        )}
      </div>
    );
  }
}

export default App;
