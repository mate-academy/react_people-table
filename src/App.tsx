import React, { useEffect, useState } from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import { Loader } from './components/Loader';
import { PeopleTable } from './components/PeopleTable';
import { PeopleTableHooks } from './components/PeopleTableHooks';

type State = {
  loaded: boolean;
};

export const App = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);

  return (
    <div className="box">
      <h1 className="title">People table</h1>

      {loaded ? (
        <PeopleTableHooks />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export class App2 extends React.Component<{}, State> {
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

    /*
    const useState2 = (initialValue: boolean) => {
      const { loaded = initialValue } = this.state;

      const setValue = (value: boolean) => {
        this.setState({ loaded: value });
      };

      return [loaded, setValue];
    };

    const [isLoaded, setLoaded] = useState2(false);
    */

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
