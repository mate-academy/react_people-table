import React from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import peopleFromServer from './people.json';
import { Person } from './types/Person';
import { PeopleTable } from './components/PeopleTable/PeopleTable';
import { Loader } from './components/Loader';

interface State {
  people: Person[],
}

export class App extends React.Component<{}, State> {
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
      <div className="box">
        <h1 className="title">People table</h1>

        {people.length > 0
          ? <PeopleTable people={people} />
          : <Loader />}
      </div>
    );
  }
}
