import React, {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import {
  Switch, Route, useHistory, useLocation,
} from 'react-router-dom';
import './App.css';
import { getDataFromServer } from './helpers/api';
import { useDebounce } from './helpers/debounce';
import { TableHeader } from './Components/TableHeader';
import { People } from './Components/People';
import { Header } from './Components/Header';

const App: React.FC = () => {
  const tableCaptions = [
    'Id',
    'Name',
    'Sex',
    'Born',
    'Died',
    'Mother',
    'Father',
    'Age',
    'Century',
  ];

  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [tableWithPeople, setTableWithPeople] = useState <Person[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const debouncedVal = useDebounce(searchQuery, 1000);

  const getPreparedData = (dataFromServer: Person[]) => {
    return dataFromServer.map(person => {
      // eslint-disable-next-line no-param-reassign
      delete person.slug;

      return {
        ...person,
        age: person.died - person.born,
        century: Math.ceil(person.died / 100),
      };
    });
  };

  const getData = useCallback(async () => {
    const data = await getDataFromServer();
    const preparedData = getPreparedData(data.data);

    setTableWithPeople(preparedData);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);


  const getSearchQuery = ((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  });

  const getFilteredPersons = (query: string, peopleArray: Person[]) => {
    const normalizedQuery = query.toLowerCase();

    return peopleArray
      .filter((person: Person) => (person.name + person.fatherName + person.motherName)
        .toLowerCase()
        .includes(normalizedQuery));
  };

  const filteredTable = useMemo(() => getFilteredPersons(debouncedVal, tableWithPeople),
    [debouncedVal, tableWithPeople]);


  return (
    <div className="App">
      <Header />
      <Switch>
        <Route
          path="/people/:name?"
          render={() => (
            <>
              <input
                type="text"
                onChange={(e) => {
                  getSearchQuery(e);
                  searchParams.set('query', e.target.value);
                  history.push({
                    search: searchParams.toString(),
                  });
                }}
              />
              <table className="table">
                <caption className="table__capture">People table</caption>

                <TableHeader columnNames={tableCaptions} />
                <People people={filteredTable} />

              </table>
            </>
          )}
        />
        <Route
          path="/"
          render={() => (
            <h1 className="home-page">Home</h1>
          )}
        />

      </Switch>

    </div>
  );
};

export default App;
