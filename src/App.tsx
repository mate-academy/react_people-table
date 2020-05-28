import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
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
  const { personName } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const queryFromURL = searchParams.get('query') || '';
  const historyPush = (param: Param, path: string): void => {
    const params = {
      ...Object.fromEntries((searchParams.entries())),
      ...param,
    };
    const pathName = path || '';

    for (const key in params) {
      searchParams.set(key, params[key]);
    }

    history.push({
      pathname: `/people/${pathName}`,
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    setQuery(queryFromURL);
  }, [queryFromURL]);

  const updateQueryInURL = (queryStr: string) => {
    if (queryStr !== '') {
      historyPush({ query: queryStr }, personName);
    } else {
      searchParams.delete('query');
      historyPush({}, personName);
    }
  };

  const applyQuery = useCallback(debounce(updateQueryInURL, 2000), []);

  const lowerQuery = queryFromURL.toLowerCase();
  const filteredPeople = useMemo(() => (
    people.filter(({ name }) => name.toLowerCase().includes(lowerQuery))
  ), [lowerQuery, people]);

  if (!people.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <Nav
        query={query}
        setQuery={setQuery}
        applyQuery={applyQuery}
      />
      <Main
        people={filteredPeople}
        historyPush={historyPush}
      />
      <footer className="App-Footer">
        &copy;Andreas Just 2020
      </footer>
    </div>
  );
};

export default App;
