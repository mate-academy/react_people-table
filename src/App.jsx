import React, { useState } from 'react';
import classNames from 'classnames';

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

  const [query, setQuery] = useState('');

  const [sex, setSex] = useState('all'); // 'm', 'f';

  // Optional
  // const sortField = ''; // 'name', 'sex', 'born'
  // const sortOrder = 'asc'; // 'desc'

  let visiblePeople = [...peopleFromServer];

  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery) {
    visiblePeople = visiblePeople.filter(person => (
      person.name.toLowerCase().includes(normalizedQuery)
    ));
  }

  if (sex !== 'all') {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  return (
    <div className="box">
      <div className="block">
        <div className="buttons has-addons">
          <button
            type="button"
            className={classNames('button', {
              'is-info': sex === 'all',
            })}
            onClick={() => setSex('all')}
          >
            all
          </button>
          <button
            type="button"
            className={classNames('button', {
              'is-info': sex === 'm',
            })}
            onClick={() => setSex('m')}
          >
            m
          </button>
          <button
            type="button"
            className={classNames('button', {
              'is-info': sex === 'f',
            })}
            onClick={() => setSex('f')}
          >
            f
          </button>
        </div>

        <input type="search" onChange={event => setQuery(event.target.value)} />
      </div>

      <table className="table is-striped is-narrow">
        <caption>
          {selectedPeople.map(person => person.name)
            .join(', ') || 'No one selected'
          }
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
          {visiblePeople.map(person => (
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
