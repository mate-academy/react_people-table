import React from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';
import { getPeopleFromServer } from './api';
import { Person } from './types/Person';
import { PeoplesTable } from './PeoplesTable';
import { Loader } from './Loader';

const MOCK_LOADING_TIME = 1000;

type State = {
  peopleFromServer: Person[];
  isError: boolean;
  isLoading: boolean;
};

export class App extends React.Component<{}, State> {
  state: State = {
    peopleFromServer: [],
    isError: false,
    isLoading: false,
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    const people = getPeopleFromServer();

    if (!people) {
      setTimeout(
        () => {
          this.setState({
            isError: true,
            isLoading: false,
          });
        },
        MOCK_LOADING_TIME,
      );

      return;
    }

    setTimeout(
      () => {
        this.setState({
          peopleFromServer: people,
          isLoading: false,
        });
      },
      MOCK_LOADING_TIME,
    );
  }

  render() {
    const {
      peopleFromServer,
      isLoading,
      isError,
    } = this.state;

    const isNoUsers = peopleFromServer.length === 0
      && !isLoading
      && !isError;

    return (
      <div className="box">
        <h1 className="title">People table</h1>

        {isError && (
          <p>Sorry, an error occurred</p>
        )}

        {isLoading && (
          <Loader />
        )}

        {isNoUsers && (
          <p>No users.</p>
        )}

        {peopleFromServer.length > 0 && (
          <PeoplesTable peopleToDisplay={peopleFromServer} />
        )}
      </div>
    );
  }
}
