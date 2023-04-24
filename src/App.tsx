import { FC, useEffect, useState } from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';
import { Loader } from './components/Loader';
import { PeopleTable } from './components/PeopleTable';

export const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="box">
      {isLoading
        ? (<Loader />)
        : (<PeopleTable />)}
    </div>
  );
};
