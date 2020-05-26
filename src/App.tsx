import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  NavLink,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { getData } from './api';
import './App.css';
import { PeopleTable } from './PeopleTable';
import debounce from 'lodash/debounce';

const App = () => {
  const [people, setPeople] = useState<PeopleTable[]>([]);

  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('query') || '';
  const [currentQuery, setCurrentQuery] = useState(search)

  useEffect(() => {
    getData().then((data) => {
      setPeople(data);
    });
  }, []);

 const updateQuery = useCallback(
   debounce((value: string) => {
     history.push({ search: value });
   }, 500),
   [],
 );

    const visiblePeople = useMemo(() => {
    return people.filter(person => (
      (person.name + person.father + person.mother).toLowerCase().includes(search.toLowerCase())
    ));
  }, [people, search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setCurrentQuery(value)
    searchParams.set('query', value);

    if (!(searchParams.get('query') || '').trim()) {
      searchParams.delete('query');
    }

    updateQuery(searchParams.toString());
  }

  useEffect(() => {
    setCurrentQuery(search);
  }, [search]);

  return (
    <div className="App">
      <header>
        <ul>
          <li className="header--item">
            <NavLink to="/" exact className="header--link">HOME</NavLink>
          </li>
          <li className="header--item">
            <NavLink to="/people" className="header--link">PEOPLE</NavLink>
          </li>
        </ul>
        <input
          type="text"
          value={currentQuery}
          placeholder="Type to search people"
          onChange={handleChange}
        />
        <h1 className="header--head">People table</h1>
      </header>

      <Switch>
        <Route path="/" exact>
          <h2 className="head--home-page">HomePage</h2>
        </Route>
        <Route
          path="/people/:name?"
          render={() => (
            <PeopleTable
              people={visiblePeople}
              searchParams={searchParams}
            />
          )}
        />
        <Redirect from="/home" to="/" />
        <Route>
          <h1>Page not found</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
