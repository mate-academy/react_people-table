import React, { useState } from 'react';
import propTypes, { objectOf } from 'prop-types';
import cn from 'classnames';
import people from './people';
import './App.css';

const preparedPeople = people.map(
  (person, index) => ({
    ...person,
    id: index + 1,
    centure: Math.ceil(person.died / 100),
    age: person.died - person.born,
    mother: person.mother || '',
    father: person.father || '',
  })
);

const App = () => {
  const [inputValue, setFiltered] = useState('');
  const [isSelected, setSelected] = useState(0);
  const [direction, setDirection] = useState('');
  const [sortType, setSortType] = useState('');

  const makeSelected = (id) => {
    setSelected(id);
  };

  let visiblePeople = preparedPeople;

  if (inputValue) {
    const searchQuery = inputValue
      .toLowerCase()
      .trim()
      .replace(/\d/g, '');

    visiblePeople = preparedPeople.filter(
      ({ name, mother, father }) => (
        (name + mother + father).toLowerCase().includes(searchQuery)
      )
    );
  }

  const sortBy = (type) => {
    if (type === sortType) {
      setDirection(direction === 'asc' ? 'desc' : 'asc');
    } else {
      setDirection('asc');
      setSortType(type);
    }
  };

  if (visiblePeople.length !== 0) {
    switch (typeof visiblePeople[0][sortType]) {
      case 'string':
        visiblePeople = [...visiblePeople]
          .sort(
            (a, b) => a[sortType].localeCompare(b[sortType])
          );
        break;

      case 'number':
        visiblePeople = [...visiblePeople]
          .sort((a, b) => b[sortType] - a[sortType]);
        break;

      default:
    }

    if (direction === 'desc') {
      visiblePeople = visiblePeople.reverse();
    }
  }

  return (
    <PeopleTable
      sortBy={sortBy}
      makeSelected={makeSelected}
      visiblePeople={visiblePeople}
      inputValue={inputValue}
      setFiltered={setFiltered}
      isSelected={isSelected}
    />
  );
};

const PeopleTable = (
  { inputValue, visiblePeople, setFiltered, isSelected, sortBy, makeSelected }
) => (
  <div className="App">
    <h1>
      {
        `People in table - ${visiblePeople.length}`
      }
    </h1>
    <input
      className="search"
      placeholder="search by name/mother/father"
      value={inputValue}
      onChange={e => setFiltered(e.target.value)}
    />
    { visiblePeople.length === 0 ? <p>no people exist</p> : (
      <table className={cn('peopleTable')}>
        <thead>
          <tr>
            <th
              onClick={() => {
                sortBy('id');
              }}
            >
            id
            </th>
            <th
              onClick={() => {
                sortBy('name');
              }}
            >
            name
            </th>
            <th
              onClick={() => {
                sortBy('sex');
              }}
            >
              sex
            </th>
            <th>born</th>
            <th>died</th>
            <th
              onClick={() => {
                sortBy('age');
              }}
            >
              age
            </th>
            <th
              onClick={() => {
                sortBy('mother');
              }}
            >
            mother
            </th>
            <th
              onClick={() => {
                sortBy('father');
              }}
            >
            father
            </th>
            <th
              onClick={() => {
                sortBy('centure');
              }}
            >
            centure
            </th>
          </tr>
        </thead>
        <tbody>
          {
            visiblePeople.map(person => (
              <tr
                key={person.id}
                onClick={() => makeSelected(person.id)}
                className={person.sex === 'm'
                  ? (
                    cn(
                      'person', 'person--male',
                      `person--lived-in-${person.centure}`,
                      { selected: isSelected === person.id }
                    )
                  )
                  : (
                    cn(
                      'person', 'person--female',
                      `person--lived-in-${person.centure}`,
                      { selected: isSelected === person.id }
                    )
                  )
                }
              >
                <td>{person.id}</td>
                <td
                  className={person.born < 1650 ? 'bornBefore1650' : ''}
                >
                  {person.name}
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td
                  className={person.died - person.born >= 65
                    ? 'ageMore65'
                    : ''}
                >
                  {person.died - person.born}
                </td>
                <td>{person.mother}</td>
                <td>{person.father}</td>
                <td>{person.centure}</td>
              </tr>
            ))}
        </tbody>
      </table>
    ) }
  </div>
);

PeopleTable.propTypes = {
  inputValue: propTypes.string.isRequired,
  visiblePeople: propTypes.arrayOf(objectOf).isRequired,
  setFiltered: propTypes.func.isRequired,
  isSelected: propTypes.number.isRequired,
  sortBy: propTypes.func.isRequired,
  makeSelected: propTypes.func.isRequired,
};

export default App;
