import React from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import peopleFromServer from './people.json';
import { Person } from './types/Person';
import { PeopleTable } from './components/PeopleTable';

interface State {
  people: Person[];
}

export class App extends React.Component {
  state: Readonly<State> = {
    people: [],
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ people: peopleFromServer });
    }, 1000);
  }

  render() {
    const { people } = this.state;

    return (
      <PeopleTable people={people} />
    );
  }
}
