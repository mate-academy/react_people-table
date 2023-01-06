import React from 'react';
import { Loader } from './components/Loader';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';
import { PeopleTable } from './components/PeopleTable';

type State = {
  isDataLoaded: boolean;
};

export class App extends React.Component<{}, State> {
  state: State = {
    isDataLoaded: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isDataLoaded: true,
      });
    }, 500);
  }

  render() {
    const { isDataLoaded } = this.state;

    return (
      <div className="box">
        <h1 className="title">People table</h1>

        {isDataLoaded ? (
          <PeopleTable />
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}
