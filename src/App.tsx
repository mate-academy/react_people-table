import React, { useState, useEffect } from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import { Loader } from './components/Loader';
import { PeopleTable } from './components/PeopleTable';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  return (
    <div className="box">
      <h1 className="title">People table</h1>

      {isLoaded
        ? <PeopleTable />
        : <Loader />}
    </div>
  );
};
