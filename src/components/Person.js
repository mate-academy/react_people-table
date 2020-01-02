import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import './table.css';

const Person = ({ person }) => {
  const { id,
    name,
    sex,
    born,
    died,
    father,
    mother,
    children,
    age,
    century } = person;
  const clazz = sex === 'f' ? 'female' : 'male';

  return (

    <Table.Row className={clazz}>
      <Table.Cell>{id}</Table.Cell>
      <Table.Cell className={born <= 1650 ? `${clazz} lineThrough` : clazz}>
        <NavLink
          className={clazz}
          to={`/people/${name.toLowerCase().replace(/ /g, '-')}`}
        >
          {name}
        </NavLink>
      </Table.Cell>
      <Table.Cell>{sex}</Table.Cell>
      <Table.Cell>{born}</Table.Cell>
      <Table.Cell>{died}</Table.Cell>
      <Table.Cell>{father}</Table.Cell>
      <Table.Cell>{mother}</Table.Cell>
      <Table.Cell className={(age) >= 65 ? 'age' : ''}>{age}</Table.Cell>
      <Table.Cell>{century}</Table.Cell>
      <Table.Cell>{children.join(', ')}</Table.Cell>
    </Table.Row>

  );
};

export default Person;

Person.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string,
    sex: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
    father: PropTypes.string,
    mother: PropTypes.string,
    age: PropTypes.number,
    century: PropTypes.number,
  }).isRequired,
};
