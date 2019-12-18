import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

class PeopleTable extends React.Component {
  state = {
    selectedPersonId: 0,
  };

  selectPerson = (id) => {
    if (id === this.state.selectedPersonId) {
      this.setState(prevState => (
        { selectedPersonId: 0 }
      ));
    } else {
      this.setState(prevState => (
        { selectedPersonId: id }
      ));
    }
  };

  render() {
    const { people, setSortBy, sortingTitle } = this.props;
    const { selectedPersonId } = this.state;
    const titles = ['id', 'name', 'sex', 'born', 'died', 'age', 'century'];

    return (
      <table className="people-table">
        <thead>
          <tr>
            {titles.map(title => (
              <th
                className={title === sortingTitle
                  ? 'title title--sorting'
                  : 'title'}
                onClick={() => setSortBy(title)}
              >
                {title.toUpperCase()}
              </th>
            ))}
            <th>MOTHER</th>
            <th>FATHER</th>
            <th>CHILDREN</th>
          </tr>
        </thead>
        <tbody>
          {people.map(currentPerson => (
            <Person
              key={currentPerson.id}
              person={currentPerson}
              isSelected={currentPerson.id === selectedPersonId}
              selectPerson={() => (this.selectPerson(currentPerson.id))}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSortBy: PropTypes.func.isRequired,
  sortingTitle: PropTypes.string.isRequired,
};

export default PeopleTable;
