import React, { useState, useEffect } from 'react';
import {
  HashRouter,
  Switch,
  Route,
  NavLink,
  Redirect,
  Link,
  useParams,
} from 'react-router-dom';
import classnames from 'classnames';
import { getPeople } from './helpers/api';
import './App.scss';

// type TableHeader = {
//   id: number;
//   name: string;
//   sex: string;
//   born: number;
//   died: number;
//   mother: string;
//   father: string;
// };


const tableHeader = ['id', 'name', 'sex', 'born', ' - ', 'died', 'mother', 'father'];

const HomePage = () => {
  return (
    <h2>Home Page perhaps</h2>
  );
};

type PropsPersonRow = {
  person: Person;
};

const PersonRow: React.FC<PropsPersonRow> = ({ person }) => {
  const {
    id,
    name,
    sex,
    born,
    died,
    slug,
    fatherName,
    motherName,
    father,
    mother,
  } = person;

  const { personSlug } = useParams();

  return (
    <tr
      className={classnames({ active: personSlug === slug })}
      key={name}
    >
      <td className="table__body">
        {id}
      </td>
      <td className={classnames({ table__body: true, male: sex === 'm', female: sex === 'f' })}>
        <Link to={`/people/${slug}`}>
          {name}
        </Link>
      </td>
      <td className={classnames({ table__body: true, male: sex === 'm', female: sex === 'f' })}>
        {person.sex}
      </td>
      <td className={classnames({ table__body: true, male: sex === 'm', female: sex === 'f' })}>
        {born}
      </td>
      <td className={classnames({ table__body: true, male: sex === 'm', female: sex === 'f' })}>-</td>
      <td className={classnames({ table__body: true, male: sex === 'm', female: sex === 'f' })}>
        {died}
      </td>
      <td className="table__body female">
        {typeof mother === 'object' ? (
          <Link to={`/people/${mother.slug}`}>
            {motherName}
          </Link>
        ) : (
          <span>{ motherName || ' - - -' }</span>
        )}
      </td>
      <td className="table__body male">

        {typeof father === 'object' ? (
          <Link to={`/people/${father.slug}`}>
            {fatherName}
          </Link>
        ) : (
          <span>{ fatherName || ' - - -' }</span>
        )}
      </td>
    </tr>
  );
};

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(peopleFromServer => {
      const preparedPeople = peopleFromServer.map((person: Person, index: number) => ({
        id: index + 1,
        ...person,
        mother: peopleFromServer.find((mom: { name: string }) => mom.name === person.motherName) || '',
        father: peopleFromServer.find((dad: { name: string }) => dad.name === person.fatherName) || '',
      }));

      return setPeople(preparedPeople);
    });
  }, []);

  // console.log(people);

  return (
    <>
      <h2>People Page perhaps</h2>
      <table className="table">
        <thead>
          <tr>
            {tableHeader.map(item => {
              return <th className="table__header" key={item}>{item.toUpperCase()}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <PersonRow key={person.slug} person={person} />
          ))}
        </tbody>
      </table>
    </>
  );
};

const App: React.FC = () => (
  <HashRouter>
    <div className="App">
      <h1>People table</h1>
      <NavLink to="/" exact>Transfer to Home</NavLink>
      <NavLink to="/people">Transfer to People</NavLink>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/home"><Redirect to="/" /></Route>
        <Route path="/people/:personSlug?" component={PeoplePage} />
        <>
          <h2>Requested page has not been created yet</h2>
        </>
      </Switch>
    </div>
  </HashRouter>
);

export default App;
