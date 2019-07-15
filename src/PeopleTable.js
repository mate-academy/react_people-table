import React from 'react';
import propTypes from 'prop-types';
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
      <table
        className="people-table"
        style={{ borderCollapse: 'collapse' }}
      >
        <thead className="people-table__thead">
          <tr>
            <th
              className="people-table__item"
              onClick={() => onSortFieldChange('id')}
            >
            ID
            </th>
            <th
              className="people-table__item"
              onClick={() => onSortFieldChange('name')}
            >
              Name
            </th>
            <th className="people-table__item">Sex</th>
            <th
              className="people-table__item"
              onClick={() => onSortFieldChange('born')}
            >
              Born
            </th>
            <th
              className="people-table__item"
              onClick={() => onSortFieldChange('died')}
            >
              Died
            </th>
            <th
              className="people-table__item"
              onClick={() => onSortFieldChange('age')}
            >
              Age
            </th>
            <th
              className="people-table__item"
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
              <tr
                key={person.id}
                className={rowClasses.join(' ')}
                onClick={() => this.setState({ selectedPersonId: person.id })}
              >
                <td className="person__item">{person.id + 1}</td>
                <td className="person__item">{person.name}</td>
                <td className="person__item">{person.sex}</td>
                <td className="person__item">{person.born}</td>
                <td className="person__item">{person.died}</td>
                <td className="person__item">{person.age}</td>
                <td className="person__item">{person.century}</td>
                <td className="person__item">{person.mother}</td>
                <td className="person__item">{person.father}</td>
                <td className="person__item">{person.children}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

PeopleTable.propTypes = {
  people: propTypes.shape().isRequired,
  onSortFieldChange: propTypes.func
    .isRequired,
};

export default PeopleTable;
