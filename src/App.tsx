import React, { useState, useEffect } from 'react';
import {
  HashRouter,
  Switch,
  Route,
  NavLink,
  Redirect,
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
  return (
    <tr className="table__body-row" key={person.name}>
      <td className="table__body">
        {person.id}
      </td>
      <td className={classnames({ table__body: true, male: person.sex === 'm', female: person.sex === 'f' })}>
        {person.name}
      </td>
      <td className={classnames({ table__body: true, male: person.sex === 'm', female: person.sex === 'f' })}>
        {person.sex}
      </td>
      <td className="table__body">
        {person.born}
      </td>
      <td className="table__body">-</td>
      <td className="table__body">
        {person.died}
      </td>
      <td className="table__body">
        {person.mother ? person.motherName : '- - -'}
      </td>
      <td className="table__body">
        {person.father ? person.fatherName : '- - -'}
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
            <PersonRow person={person} />
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
        <Route path="/people" component={PeoplePage} />
        <>
          <h2>Requested page has not been created yet</h2>
        </>
      </Switch>
    </div>
  </HashRouter>
);

export default App;
