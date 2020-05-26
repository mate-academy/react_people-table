import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  NavLink,
  Link,
  Redirect,
  RouteComponentProps,
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';
import classnames from 'classnames';

import './App.scss';

const getPeople = (): Promise<Person[]> => {
  return fetch('https://mgrinko.github.io/react_people-table/api/people.json')
    .then(res => res.json());
}

interface Person {
  name: string,
  sex: string,
  born: number,
  died: number,
  father: string,
  mother: string,
}

const Nav = () => (
  <nav className="Nav">
    <ul className="Nav__list">
      <li className="Nav__item">
        <NavLink
          to="/"
          exact
          className="Nav__link"
          activeClassName="Nav__link--active"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/people"
          className="Nav__link"
          activeClassName="Nav__link--active"
        >
          People
        </NavLink>
      </li>
    </ul>
  </nav>
);

const Search = () => {
  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search)
  const query: string = searchParams.get('query') || '';

  return (
    <input
      type="text"
      value={query}
      onChange={(event) => {
        history.push({
          search: `?query=${event.target.value}`
        });
      }}
    />
  );
}

const App = () => {
  return (
    <div className="App">
      <header>
        <Nav />
        <Link to={{ search: `?page=2` }}>page 2</Link>
        <Route path="/people" component={Search} />
      </header>

      <main>
        <Switch>
          <Route
            path="/people/:personName?"
            component={PeoplePage}
          />

          <Route path="/" exact>
            <h1>Home Page</h1>
          </Route>

          <Redirect from="/home" to="/" />

          <h1>Not found</h1>
        </Switch>
      </main>

      <footer>
        Mate academy 2020
      </footer>
    </div>
  );
};

type Props = RouteComponentProps<{
  personName: string;
}>;

const PeoplePage: React.FC<Props> = ({ history, location }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const { personName } = useParams();

  const searchParams = new URLSearchParams(location.search);
  const query: string = searchParams.get('query') || '';

  const page: number = Number(searchParams.get('page')) || 1;
  const perPage: number = Number(searchParams.get('perPage')) || 10;

  const start = (page - 1) * perPage;
  const pattern = new RegExp(query, 'i');

  const visiblePeople = people
    .filter(p => pattern.test(p.name))
    .slice(start, start + perPage);

  useEffect(() => {
    getPeople().then(setPeople)
  }, []);

  if (people.length === 0) {
    return <p>'Loading...'</p>;
  }

  if (personName && !people.some(p => p.name === personName)) {
    history.push({ pathname: '/people' });
  }

  return (
    <div className="PeoplePage">
      <h1>People table: Page {page}, perPage: {perPage}</h1>

      <ul>
        {visiblePeople.map(person => (
          <li
            key={person.name}
            className={classnames({
              'Person': true,
              'Person--active': personName === person.name,
            })}
          >
            <Link to={`/people/${person.name}`}>
              {person.name} ({person.born} - {person.died})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
