import React, { useState } from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import peopleFromServer from './people.json';

// #region CustomUseState
let currentValue;
let initialized = false;

function useState2(startValue) {
  if (!initialized) {
    currentValue = startValue;
    initialized = true;
  }

  function setValue(newValue) {
    if (currentValue === newValue) {
      return;
    }

    currentValue = newValue;
    // rerender component
  }

  return [currentValue, setValue];
}
// #endregion

export function App() {
  const [selectedPerson, setSelectedPerson] = useState(null);

  return (
    <div className="box">
      <h1 className="title">People table</h1>

      <table className="table is-striped is-narrow">
        <caption>{selectedPerson?.name || 'No person selected'}</caption>

        <thead>
          <tr>
            <th> </th>
            <th>name</th>
            <th>sex</th>
            <th>born</th>
          </tr>
        </thead>

        <tbody>
          {peopleFromServer.map(person => (
            <tr
              key={person.slug}
              className={person === selectedPerson
                ? 'has-background-warning'
                : ''}
            >
              <td>
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    setSelectedPerson(person);
                  }}
                >
                  +
                </button>
              </td>
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
