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
  })
);

const App = () => {
  const [inputValue, setFiltered] = useState('');
  const [isSelected, setSelected] = useState(0);
  const [isSorted, setSorted] = useState(false);
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

    visiblePeople = visiblePeople.filter(
      ({ name, mother, father }) => (
        (name + mother + father).toLowerCase().includes(searchQuery)
      )
    );
  }

  if (isSorted) {
    switch (sortType) {
      case 'id':
      case 'centure':
        visiblePeople = [...visiblePeople]
          .sort((a, b) => b[sortType] - a[sortType]);
        break;
      case 'age':
        visiblePeople = [...visiblePeople]
          .sort((a, b) => (a.died - a.born) - (b.died - b.born));
        break;
      case 'name':
      case 'mother':
      case 'father':
      case 'sex':
        visiblePeople = [...visiblePeople]
          .sort(
            (a, b) => (a[sortType] && b[sortType] !== null ? a[sortType]
              .localeCompare(b[sortType]) : 0)
          );
        break;

      default:
    }
  } else if (!isSorted && sortType !== '') {
    switch (sortType) {
      case 'id':
      case 'centure':
        visiblePeople = [...visiblePeople]
          .sort((a, b) => a[sortType] - b[sortType]);
        break;
      case 'age':
        visiblePeople = [...visiblePeople]
          .sort((a, b) => (b.died - b.born) - (a.died - a.born));
        break;
      case 'name':
      case 'mother':
      case 'father':
      case 'sex':
        visiblePeople = [...visiblePeople]
          .sort(
            (a, b) => (a[sortType] && b[sortType] !== null ? b[sortType]
              .localeCompare(a[sortType]) : 0)
          );
        break;

      default:
    }
  }

  return (
    <PeopleTable
      makeSelected={makeSelected}
      visiblePeople={visiblePeople}
      inputValue={inputValue}
      setFiltered={setFiltered}
      isSelected={isSelected}
      sortType={sortType}
      isSorted={isSorted}
      setSorted={setSorted}
      setSortType={setSortType}
    />
  );
};

const PeopleTable = (
  { inputValue, isSorted, visiblePeople, setFiltered, isSelected,
    setSortType, setSorted, makeSelected }
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
                setSortType('id'); setSorted(!isSorted);
              }}
            >
            id
            </th>
            <th
              onClick={() => {
                setSortType('name'); setSorted(!isSorted);
              }}
            >
            name
            </th>
            <th
              onClick={() => {
                setSortType('sex'); setSorted(!isSorted);
              }}
            >
              sex
            </th>
            <th>born</th>
            <th>died</th>
            <th
              onClick={() => {
                setSortType('age'); setSorted(!isSorted);
              }}
            >
              age
            </th>
            <th
              onClick={() => {
                setSortType('mother'); setSorted(!isSorted);
              }}
            >
            mother
            </th>
            <th
              onClick={() => {
                setSortType('father'); setSorted(!isSorted);
              }}
            >
            father
            </th>
            <th
              onClick={() => {
                setSortType('centure'); setSorted(!isSorted);
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
  isSorted: propTypes.bool.isRequired,
  visiblePeople: propTypes.arrayOf(objectOf).isRequired,
  setFiltered: propTypes.func.isRequired,
  isSelected: propTypes.number.isRequired,
  setSortType: propTypes.func.isRequired,
  setSorted: propTypes.func.isRequired,
  makeSelected: propTypes.func.isRequired,
};

export default App;
