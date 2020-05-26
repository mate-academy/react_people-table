import React from 'react';
import {
  Switch,
  Route,
  NavLink,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom'
import HomePage from './components/HomePage';
import PeoplePage from './components/PeoplePage';
//import classnames from 'classnames';
import './App.css';



const App = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search)
  const query: string = searchParams.get('query') || '';
  return (
    <div className="App">
      <div className="header__wrapper">
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
      </div>

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


export default App;

