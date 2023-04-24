import React from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import { PeopleTable } from './components/PeopleTable';
import { Loader } from './components/Loader';

interface State {
  isLoading: boolean;
}

export class App extends React.Component<{}, State> {
  state: Readonly<State> = {
    isLoading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 500);
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div className="box">
        {isLoading
          ? (<Loader />)
          : (<PeopleTable />)}
      </div>
    );
  }
}
