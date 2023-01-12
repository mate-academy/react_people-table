import React, { useEffect, useState } from 'react';
import { Loader } from './components/Loader';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';
import { PeopleTable } from './components/PeopleTable';
import { PeopleTableHooks } from './components/PeopleTableHooks';

type State = {
  isDataLoaded: boolean;
};

export class App2 extends React.Component<{}, State> {
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

export const App: React.FC = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsDataLoaded(true);
    }, 2000);
  }, []);

  return (
    <div className="box">
      <h1 className="title">People table</h1>

      {isDataLoaded ? (
        <PeopleTableHooks />
      ) : (
        <Loader />
      )}
    </div>
  );
};
