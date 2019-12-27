import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Person from './Person';

class PeopleTable extends React.Component {
  state = {
    selectedPersonId: 0,
  };

  selectPerson = (id) => {
    if (id === this.state.selectedPersonId) {
      this.setState({ selectedPersonId: 0 });
    } else {
      this.setState({ selectedPersonId: id });
    }
  };

  render() {
    const { people, setSortBy, sortingTitle } = this.props;
    const { selectedPersonId } = this.state;
    const titles = [
      'id',
      'name',
      'sex',
      'born',
      'died',
      'age',
      'century',
      'mother',
      'father',
      'children',
    ];

    return (
      <table className="people-table">
        <thead>
          <tr>
            {titles.map((title) => {
              switch (title) {
                case 'mother':
                case 'father':
                case 'children':
                  return (
                    <th>{title.toUpperCase()}</th>
                  );
                default:
                  return (
                    <th
                      className={
                        cn(
                          'title--sortable',
                          { 'title--active': sortingTitle === title }
                        )}
                      onClick={() => setSortBy(title)}
                    >
                      {title.toUpperCase()}
                    </th>
                  );
              }
            })}
          </tr>
        </thead>
        <tbody>
          {people.map(currentPerson => (
            <Person
              key={currentPerson.id}
              titles={titles}
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
  people: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired,
    mother: PropTypes.string.isRequired,
    father: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      sex: PropTypes.string,
    })).isRequired,
  })).isRequired,
  setSortBy: PropTypes.func.isRequired,
  sortingTitle: PropTypes.string.isRequired,
};

export default PeopleTable;
