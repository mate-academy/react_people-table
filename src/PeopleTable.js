import React from 'react';
import propTypes from 'prop-types';
import Person from './Person';
import './styles/peopleTable.css';
import './styles/person.css';

const parentsClass = (person) => {
  if (person.children.length > 0) {
    return (person.sex === 'f')
      ? 'person--mother'
      : 'person--father';
  }
  return '';
};

class PeopleTable extends React.Component {
  state = {
    selectedPersonId: null,
  };

  render() {
    const { people, onSortFieldChange } = this.props;
    const { selectedPersonId } = this.state;

    return (
      <>
        <table
          className="people-table"
        >
          <thead className="people-table__thead">
            <tr>
              <th
                className="people-table__item people-table__item--click"
                onClick={() => onSortFieldChange('id')}
              >
                ID
              </th>
              <th
                className="people-table__item people-table__item--click"
                onClick={() => onSortFieldChange('name')}
              >
                Name
              </th>
              <th className="people-table__item">Sex</th>
              <th
                className="people-table__item people-table__item--click"
                onClick={() => onSortFieldChange('born')}
              >
                Born
              </th>
              <th
                className="people-table__item people-table__item--click"
                onClick={() => onSortFieldChange('died')}
              >
                Died
              </th>
              <th
                className="people-table__item people-table__item--click"
                onClick={() => onSortFieldChange('age')}
              >
                Age
              </th>
              <th
                className="people-table__item people-table__item--click"
                onClick={() => onSortFieldChange('century')}
              >
                Century
              </th>
              <th className="people-table__item">Mother</th>
              <th className="people-table__item">Father</th>
              <th className="people-table__item">Children</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => {
              const rowClasses = ['people-table__row'];
              if (person.id === selectedPersonId) {
                rowClasses.push('people-table__row--selected');
              }

              const classParent = parentsClass(person);
              rowClasses.push(classParent);

              return (
                <Person
                  key={person.id}
                  person={person}
                  selected={person.id === selectedPersonId}
                  onSelected={() => {
                    this.setState({ selectedPersonId: person.id });
                  }}
                />
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

PeopleTable.propTypes = {
  people: propTypes.shape().isRequired,
  onSortFieldChange: propTypes.func
    .isRequired,
  onFilterFieldChange: propTypes.func
    .isRequired,
};

export default PeopleTable;
