import React from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import { Loader } from './components/Loader';
import { PeopleTable } from './components/PeopleTable';

type State = {
  loaded: boolean;
};

export class App extends React.Component<{}, State> {
  state: Readonly<State> = {
    loaded: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loaded: true });
    }, 500);
  }

  render() {
    const { loaded } = this.state;

    return (
      <div className="box">
        <h1 className="title">People table</h1>

        {loaded ? (
          <PeopleTable />
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}
