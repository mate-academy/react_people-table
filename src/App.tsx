import React from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import peopleFromServer from './people.json';

export class App extends React.Component {
  state = {};

  render() {
    return (
      <div className="box">
        <h1 className="title">People table</h1>

        <table className="table is-striped is-narrow">
          <thead>
            <tr>
              <th>name</th>
              <th>sex</th>
              <th>born</th>
            </tr>
          </thead>

          <tbody>
            {peopleFromServer.map(person => (
              <tr key={person.slug}>
                <td>{person.name}</td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
