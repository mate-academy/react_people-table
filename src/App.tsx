import { FC, useEffect, useState } from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import { PeopleTable } from './components/PeopleTable/PeopleTable';
import { Loader } from './components/Loader';

export const App: FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  return (
    <div className="box">
      <h1 className="title">People table</h1>

      {!isLoaded && <Loader />}

      {isLoaded && <PeopleTable />}
    </div>
  );
};
