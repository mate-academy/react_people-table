import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import './Person.css';
import { Table } from 'semantic-ui-react';

class Person extends PureComponent {
  render() {
    const { person: { id, name, sex, age, born, died, century, father, mother, children }, onClick, selectedId } = this.props;

    return (
      <Table.Row active={selectedId === id} textAlign="center" onClick={onClick} data-person-id={id}>
        <Table.Cell>{id}</Table.Cell>
        <Table.Cell className={born < 1650 ? 'wasBornBefore1650' : null}>{name}</Table.Cell>
        <Table.Cell className={sex === 'm' ? 'male' : 'female'}>{sex}</Table.Cell>
        <Table.Cell className={age >= 65 ? 'ageMore65' : null}>{age}</Table.Cell>
        <Table.Cell>{born}</Table.Cell>
        <Table.Cell>{died}</Table.Cell>
        <Table.Cell>{century}</Table.Cell>
        <Table.Cell>{mother}</Table.Cell>
        <Table.Cell>{father}</Table.Cell>
        <Table.Cell>
          {children.map((child, index) => children.length - 1 !== index ? `${child.name}, ` : child.name)}
        </Table.Cell>
      </Table.Row>
    );
  }
}

Person.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    father: PropTypes.string,
    mother: PropTypes.string,
  }).isRequired,
  personId: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Person;
