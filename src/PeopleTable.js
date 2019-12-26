import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';
import Sort from './Sort';

const columnTitles
  = ['id', 'name', 'sex', 'born', 'died', 'age', 'century', 'mother', 'father'];

class PeopleTable extends React.Component {
  state = { selectedRow: '' }

  clickhandler = (index) => {
    this.setState({ selectedRow: this.props.people[index].id });
  }

  render() {
    const { selectedRow } = this.state;

    return (
      <table className="table">
        <thead>
          <tr>
            {columnTitles.map(title => (
              <Sort
                toSort={this.props.toSort}
                title={title}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {this.props.people.map((person, i) => (
            <Person
              person={person}
              index={i}
              handler={this.clickhandler}
              selected={person.id === selectedRow}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

PeopleTable.propTypes = {
  toSort: PropTypes.func.isRequired,
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PeopleTable;
