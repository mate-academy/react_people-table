/* eslint-disable no-console */
import React, { useState } from 'react';
import classNames from 'classnames';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import peopleFromServer from './people.json';
import { Button } from './components/Button/Button';
import { PeopleList } from './components/PeopleList/PeopleList';

function getPreparedPeople(people, option) {
  const {
    query = '',
    sex = 'all',
  } = option;

  let preparedPeople = [...people];

  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery) {
    preparedPeople = preparedPeople.filter(person => (
      person.name.toLowerCase().includes(normalizedQuery)
    ));
  }

  if (sex !== 'all') {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  return preparedPeople;
}

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

  console.log(`App component -> query: "${query}"`);

  const resetFilters = () => {
    setQuery('');
    console.log(`resetFilters -> query: "${query}"`);

    setSex('all');
  };

  return (
    <div className="box">
      <div className="block">
        <div className="buttons has-addons">
          <Button
            className={classNames({
              'is-info': sex === 'all',
            })}
            onClick={() => setSex('all')}
          >
            all
          </Button>
          <Button
            className={classNames({
              'is-info': sex === 'm',
            })}
            onClick={() => setSex('m')}
          >
            m
          </Button>
          <Button
            className={classNames({
              'is-info': sex === 'f',
            })}
            onClick={() => setSex('f')}
          >
            f
          </Button>
        </div>

        <input
          type="search"
          onChange={event => setQuery(event.target.value)}
          value={query}
        />
      </div>

      <Button onClick={resetFilters}>
        Reset
      </Button>

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
          <PeopleList
            people={getPreparedPeople(peopleFromServer, { query, sex })}
            onAddPerson={addPerson}
            onRemovePerson={removePerson}
            isSelected={isSelected}
          />
        </tbody>
      </table>
    </div>
  );
}
