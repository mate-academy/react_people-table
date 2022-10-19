import React from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import peopleFromServer from './people.json';
import { Person } from './types/Person';
import { Loader } from './components/Loader';
import { PeopleTable } from './components/PeopleTable';

type State = {
  people: Person[];
  isLoaded: boolean;
};

export class App extends React.Component<{}, State> {
  state: Readonly<State> = {
    people: [],
    isLoaded: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        people: peopleFromServer,
        isLoaded: true,
      });
    }, 1000);
  }

  render() {
    const { people, isLoaded } = this.state;

    return (
      <div className="box">
        <h1 className="title">People table</h1>

        {isLoaded
          ? <PeopleTable people={people} />
          : <Loader />}
      </div>
    );
  }
}
