import React from 'react';
import PropTypes from 'prop-types';
import PersonRow from './PersonRow';

const tableHeaders = [
  {
    code: 'id',
    label: 'Id',
  },
  {
    code: 'name',
    label: 'Name',
  },
  {
    code: 'sex',
    label: 'Sex',
  },
  {
    code: 'born',
    label: 'Born',
  },
  {
    code: 'died',
    label: 'Died',
  },
  {
    code: 'age',
    label: 'Age',
  },
  {
    code: 'century',
    label: 'Century',
  },
  {
    code: 'mother',
    label: 'Mother',
  },
  {
    code: 'father',
    label: 'Father',
  },
];

class PeopleTable extends React.Component {
  state = { selectedElement: null };

  handleClick = id => this.setState({ selectedElement: id });

  render() {
    const { people } = this.props;

    return (
      <table className="peopleTable">
        <thead>
          <tr>
            {tableHeaders.map(header => (
              <th
                key={header.code}
                onClick={() => this.props.sortFields(header.code)}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {people.map(
            singlePerson => (
              <PersonRow
                key={singlePerson.name}
                person={singlePerson}
                headers={tableHeaders}
                selected={singlePerson.id === this.state.selectedElement}
                handleClick={this.handleClick}
              />
            )
          )}
        </tbody>
      </table>
    );
  }
}

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortFields: PropTypes.func.isRequired,
};

export default PeopleTable;
