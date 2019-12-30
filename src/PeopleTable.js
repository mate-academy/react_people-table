import React from 'react';
import propTypes from 'prop-types';
import cn from 'classnames';

const PeopleTable = (
  { inputValue, visiblePeople, setFiltered, isSelected, sortBy, makeSelected }
) => (
  <>
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
            <th
              onClick={() => {
                sortBy('born');
              }}
            >
              born
            </th>
            <th
              onClick={() => {
                sortBy('died');
              }}
            >
              died
            </th>
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
  </>
);

PeopleTable.propTypes = {
  inputValue: propTypes.string.isRequired,
  visiblePeople: propTypes.arrayOf(propTypes.object).isRequired,
  setFiltered: propTypes.func.isRequired,
  isSelected: propTypes.oneOf([propTypes.object, propTypes.number]).isRequired,
  sortBy: propTypes.func.isRequired,
  makeSelected: propTypes.func.isRequired,
};

export default PeopleTable;
