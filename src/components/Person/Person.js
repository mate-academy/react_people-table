import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Table } from 'semantic-ui-react';

const Person = ({ person, selectLine, selectedLine }) => (
  <Table.Row
    className={classNames({
      active: selectedLine,
    })}
    onClick={() => selectLine(person.id)}
  >
    <td>{person.id}</td>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td className={person.age > 65 ? 'ui green inverted table' : null}>
      {person.age}
    </td>
    <td>{person.century}</td>
    <td>{person.mother}</td>
    <td>{person.father}</td>
    <td>{person.children.map(child => child.name).join(', ')}</td>
  </Table.Row>
);

Person.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    mother: PropTypes.string,
    father: PropTypes.string,
    age: PropTypes.number.isRequired,
    century: PropTypes.number.isRequired,
    children: PropTypes.array,
  }).isRequired,
  selectedLine: PropTypes.number.isRequired,
  selectLine: PropTypes.func.isRequired,
};

export default Person;
