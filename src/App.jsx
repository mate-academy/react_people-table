import React, { useState } from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import peopleFromServer from './people.json';

export function App() {
  // #region People Selection Logic
  const [selectedPeople, setSelectedPerson] = useState([]);

  const isSelected = ({ slug }) => selectedPeople.some(p => p.slug === slug);

  const addPerson = (person) => {
    setSelectedPerson([...selectedPeople, person]);
  };

  const removePerson = (person) => {
    setSelectedPerson(
      selectedPeople.filter(p => p.slug !== person.slug),
    );
  };
  // #endregion

  return (
    <div className="box">
      <h1 className="title">People table</h1>

      <table className="table is-striped is-narrow">
        <caption>
          {selectedPeople.map(p => p.name).join(' ,') || 'No one selected'}
        </caption>

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
                {isSelected(person) ? (
                  <button
                    type="button"
                    className="button is-small is-rounded is-danger"
                    onClick={() => removePerson(person)}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-minus" />
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="button is-small is-rounded is-success"
                    onClick={() => addPerson(person)}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-plus" />
                    </span>
                  </button>
                )}
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
