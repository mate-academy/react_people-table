import { useState } from 'react';
import classNames from 'classnames';
import peopleFromServer from './people.json';
import { Button } from './components/Button/Button';

function getFilteredPeople(people, query, sex) {
  let filteredPeople = people;

  if (query) {
    const normalizedQuery = query.toLowerCase();

    filteredPeople = filteredPeople.filter(
      person => person.name.toLowerCase().startsWith(normalizedQuery),
    );
  }

  if (sex !== 'all') {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  return filteredPeople;
}

export const App = ({ user }) => {
  const [query, setQuery] = useState('');
  const [sex, setSex] = useState('all');

  const visiblePeople = getFilteredPeople(peopleFromServer, query, sex);

  // #region selected
  const [selectedPeople, setSelectedPeople] = useState([]);

  const isSelected = personToCheck => selectedPeople.some(
    person => person.slug === personToCheck.slug,
  );

  const selectPerson = (person) => {
    setSelectedPeople([...selectedPeople, person]);
  };

  const unselectPerson = (personToRemove) => {
    setSelectedPeople(
      selectedPeople.filter(person => person.slug !== personToRemove.slug),
    );
  };
  // #endregion

  return (
    <div className="box">
      <button type="button" onClick={() => setSex('all')}>all</button>
      <button type="button" onClick={() => setSex('m')}>m</button>
      <button type="button" onClick={() => setSex('f')}>f</button>
      {sex}

      <input
        type="search"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />

      <table className="table is-striped is-narrow">
        <caption className="title is-5 has-text-info">
          {selectedPeople
            .map(person => person.name)
            .join(', ')
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
              className={classNames({
                'has-background-warning': isSelected(person),
              })}
            >
              <td>
                {isSelected(person) ? (
                  <Button
                    onClick={() => unselectPerson(person)}
                    className="is-danger is-small is-rounded"
                  >
                    <span className="icon is-small">
                      <i className="fas fa-minus" />
                    </span>
                  </Button>
                ) : (
                  <Button
                    onClick={() => selectPerson(person)}
                    className="is-success is-small is-rounded"
                  >
                    <span className="icon is-small">
                      <i className="fas fa-plus" />
                    </span>
                  </Button>
                )}
              </td>

              <td
                className={classNames('Person__name', {
                  'has-text-link': person.sex === 'm',
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
