import React from 'react';
import PropTypes from 'prop-types';
import PersonRow from './PersonRow';

const TABLE_HEADERS = [
  {
    code: 'id',
    label: 'Id',
    type: 'number',
  },
  {
    code: 'name',
    label: 'Name',
    type: 'string',
  },
  {
    code: 'sex',
    label: 'Sex',
    type: 'string',
  },
  {
    code: 'born',
    label: 'Born',
    type: 'number',
  },
  {
    code: 'died',
    label: 'Died',
    type: 'number',
  },
  {
    code: 'age',
    label: 'Age',
    type: 'number',
  },
  {
    code: 'century',
    label: 'Century',
    type: 'number',
  },
  {
    code: 'mother',
    label: 'Mother',
    type: 'string',
  },
  {
    code: 'father',
    label: 'Father',
    type: 'string',
  },
];

class PeopleTable extends React.Component {
  state = { selectedElement: null };

  selectRow = id => this.setState({ selectedElement: id });

  render() {
    const { people, sortFields } = this.props;

    return (
      people.length > 0 && (
        <table className="people__table">
          <thead>
            <tr>
              {TABLE_HEADERS.map(header => (
                <th
                  key={header.code}
                  onClick={() => sortFields(header.code, header.type)}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {people.map(
              person => (
                <PersonRow
                  key={person.name}
                  person={person}
                  headers={TABLE_HEADERS}
                  selected={person.id === this.state.selectedElement}
                  selectRow={this.selectRow}
                />
              )
            )}
          </tbody>
        </table>
      )
    );
  }
}

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortFields: PropTypes.func.isRequired,
};

export default PeopleTable;
