import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  NavLink,
  Redirect,
  RouteComponentProps,
  //Link,
  useHistory,
  useLocation,
} from 'react-router-dom'
// import { HomePage } from './components/HomePage';
// import { PeoplePage } from './components/PeoplePage';
import classnames from 'classnames';
import './App.css';
//import { start } from 'repl';

const getPeople = (): Promise<Person[]> => {
  return fetch('./api/people.json')
    .then(res => res.json());
}

const App = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search)
  const query: string = searchParams.get('query') || '';
  return (
    <div className="App">
      <header className='App__header'>
        <Nav />
        <Route path="/people">
          <input
            type="text"
            value={query}
            onChange={(event) => {
              history.push({
                search: `?query=${event.target.value}`
              })
            }} />
        </Route>
      </header>
      <Switch>
        <Route path="/" exact component={HomePage}></Route>
        <Route path="/people/:personName?" component={PeoplePage}></Route>
        <h1>Page not found</h1>
        <Redirect from='/home' to='/' />
      </Switch>
    </div>
  )
};

const Nav = () => (
  <nav className="Nav">
    <ul className="Nav__list">
      <li className="Nav__item">
        <NavLink to="/"
          className="Nav__link"
          exact
          activeClassName="Nav__link--active"
        >
          Home</NavLink>
      </li>
      <li className="Nav__item">
        <NavLink to="/people"
          className="Nav__link"
          activeClassName="Nav__link--active"
        >People</NavLink>
      </li>
    </ul>
  </nav>
)

const HomePage = () => (<h1> Home Page</h1>)

type Props = RouteComponentProps<{
  personName: string;
}>;


const PeoplePage: React.FC<Props> = ({ match, location, history }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const { personName } = match.params;
  //const history = useHistory();
  const searchParams = new URLSearchParams(location.search)
  const query: string = searchParams.get('query') || '';

  // Useful to do PAGINATION, shows page(1) and how many is there on a page(10)
  // const page: number = Number(searchParams.get('page')) || 1;
  // const perPage: number = Number(searchParams.get('perPage')) || 10;
  // const start = (page - 1) * perPage;

  const pattern = new RegExp(query, 'i');

  const visiblePeople = people
    .filter(p => pattern.test(p.name))
  // .slice(start, start + perPage);

  useEffect(() => {
    getPeople().then(setPeople)
  }, []);

  if (people.length === 0) {
    return <p>Loading...</p>;
  }
  if (personName && !people.some(p => p.name === personName)) {
    history.push({
      pathname: '/people',
      //search: '&page=1&perPages=5'
    });
  }


  let columns = ['name', 'sex', 'born', 'died', 'motherName', 'fatherName', 'slug'];


  // const onPersonSelected = (person: Person) => {
  //   history.push({
  //     pathname: `/people/${person.slug}`,// `/people/${person.name}-${person.born}`
  //     //search: `?query=${personName}`
  //   })
  // }

  return (
    <div className="PeoplePage">
      <h1> People table
        {/* : Page {page}, perPage: {perPage} */}
      </h1>
      <table>
        <thead>
          <tr>
            <th className="table__head">Row №</th>
            {columns.map(columnName => (
              <th className="table__head">
                {columnName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visiblePeople.map((person: Person, index) => {
            return (
              <tr
              className={classnames({
                person__woman: person.sex === 'f',
                person__man: person.sex === 'm',

              })}
                onClick={() => {
                  console.log(person.slug);

                  history.push({
                    pathname: `/people/${person.name}`,
                  });
                }
                  //onPersonSelected(person)
                }
              >
                <td>{index + 1}</td>
                {
                  columns.map((colName) =>
                    (<td
                      className={classnames({
                        'Person': true,
                        'Person--active': personName === person.name,
                      })}
                    >
                      {person[colName as keyof Person]}
                    </td>
                    ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App;

{/* <Link to={`${match.path}/${person.name}`}>
                    {person[colName as keyof Person]}
                  </Link> */}
