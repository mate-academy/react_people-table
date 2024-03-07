import React, { useState } from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import peopleFromServer from './people.json';

export function App() {
  const [selectedPerson, setSelectedPerson] = useState(peopleFromServer[5]);

  const isSelected = person => person.slug === (selectedPerson?.slug); //

  // eslint-disable-next-line no-console
  console.log('App rerendering....');

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
              className={isSelected(person)
                ? 'has-background-warning'
                : ''}
            >
              <td>
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    if (isSelected(person)) {
                      setSelectedPerson(null);

                      return;
                    }

                    setSelectedPerson(person);
                  }}
                >
                  {isSelected(person) ? '-' : '+'}
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
