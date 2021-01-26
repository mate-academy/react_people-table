import React from 'react';

import './App.scss';
import { PeopleTable } from './PeopleTable';
import { get10People } from './api';

class App extends React.Component {
  state = {
    people: [],
  };

  componentDidMount() {
    get10People()
      .then((peopleFromServer) => {
        this.setState({
          people: peopleFromServer,
        });
      });
  }

  render() {
    const { people } = this.state;

    return (
      <main>
        <h1>People table</h1>

        <PeopleTable people={people} />
      </main>
    );
  }
}

export default App;
