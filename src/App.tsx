import { useEffect, useState } from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import { Loader } from './components/Loader';
import { PeopleTable } from './components/PeopleTable';

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
        <PeopleTable />
      ) : (
        <Loader />
      )}
    </div>
  );
};
