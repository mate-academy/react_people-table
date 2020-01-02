import React from 'react';
import propTypes from 'prop-types';
import cn from 'classnames';
import { DebounceInput } from 'react-debounce-input';

const PeopleTable = (
  { inputValue, visiblePeople, isSelected,
    sortBy, makeSelected, handleInputChange, pathNameOfPeople }
) => (
  <>
    <h1>
      {
        `People in table - ${visiblePeople.length}`
      }
    </h1>
    <DebounceInput
      placeholder="search by name/mother/father"
      className="search"
      onChange={e => handleInputChange(e.target.value)}
      value={inputValue}
      debounceTimeout={700}
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
                      {
                        selected: isSelected === person.id
                        || pathNameOfPeople === person
                          .name
                          .toLowerCase()
                          .replace(/ /g, '-'),
                      }
                    )
                  )
                  : (
                    cn(
                      'person', 'person--female',
                      `person--lived-in-${person.centure}`,
                      {
                        selected: isSelected === person.id
                        || pathNameOfPeople === person
                          .name
                          .toLowerCase()
                          .replace(/ /g, '-'),
                      }
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
  handleInputChange: propTypes.func.isRequired,
  isSelected: propTypes.oneOf([propTypes.object, propTypes.number]).isRequired,
  sortBy: propTypes.func.isRequired,
  makeSelected: propTypes.func.isRequired,
  pathNameOfPeople: propTypes.string.isRequired,
};

export default PeopleTable;
