import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';
import Nav from './components/Nav';
import Main from './components/Main';
import { getTabs } from './api/getTabs';
import './App.scss';

const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTabs().then(setPeople);
  }, []);

  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryFromURL = searchParams.get('query') || '';

  useEffect(() => {
    setQuery(queryFromURL);
  }, [queryFromURL]);

  const updateQueryInURL = (queryStr: string) => {
    if (queryStr) {
      searchParams.set('query', queryStr);
    } else {
      searchParams.delete('query');
    }

    history.push({ search: searchParams.toString() });
  };

  const applyQuery = useCallback(debounce(updateQueryInURL, 1000), []);

  const lowerQuery = queryFromURL.toLowerCase();
  const filteredPeople = useMemo(() => (
    people.filter(({ name }) => name.toLowerCase().includes(lowerQuery))
  ), [lowerQuery, people]);

  return (
    <div className="App">
      <Nav
        query={query}
        setQuery={setQuery}
        applyQuery={applyQuery}
      />
      <Main people={filteredPeople} />
      <footer className="App-Footer">
        &copy;Andreas Just 2020
      </footer>
    </div>
  );
};

export default App;
