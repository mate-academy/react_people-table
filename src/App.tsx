import React, { useEffect, useState } from 'react';

import './App.scss';
import { PeopleTable } from './PeopleTable';

export const App: React.FC = () => {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  return (
    <div className="App">
      <h1>People table</h1>

      {!isLoaded && (
        <p>Loading...</p>
      )}

      {isLoaded && (
        <PeopleTable />
      )}
    </div>
  );
};
