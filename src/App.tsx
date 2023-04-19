import React from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import peopleFromServer from './people.json';
import { Person } from './types/Person';
import { PeopleTable } from './components/PeopleTable';
import { Loader } from './components/Loader';

interface State {
  people: Person[];
  isLoading: boolean;
}

export class App extends React.Component<{}, State> {
  state: Readonly<State> = {
    people: [],
    isLoading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        people: peopleFromServer,
        isLoading: false,
      });
    }, 2000);
  }

  render() {
    const { people, isLoading } = this.state;

    return (
      <>
        {isLoading
          ? (<Loader />)
          : (<PeopleTable people={people} />)}
      </>
    );
  }
}
