import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Person = ({ person, selected, onSelected }) => {
  const classes = classnames(
    'Person',
    `Person--lived-in-${person.century}`,
    {
      'Person--selected': selected,
      'Person--man': person.sex === 'm',
      'Person--womam': person.sex === 'f',
      'Person--long-liver': person.age >= 65,
    }
  );

  return (
    <tr
      className={classes}
      onClick={onSelected}
    >
      <td>{person.id}</td>
      <td>
        <PersonName person={person} />
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.age}</td>
      <td>{person.century}</td>
      <td>
        {person.mother ? (
          <PersonName person={person.mother} />
        ) : '-' }
      </td>
      <td>
        {person.father ? (
          <PersonName person={person.father} />
        ) : '-' }
      </td>
      <td>
        <ul>
          {person.children.map(child => (
            <li key={child.id}>
              <PersonName person={child} />
            </li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

const PersonName = ({ person }) => {
  const style = {
    color: (person.sex === 'm') ? 'blue' : 'red',
  };

  return (
    <b style={style}>
      {person.name}
    </b>
  );
};

PersonName.propTypes = {
  person: PropTypes.shape({
    sex: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const PersonType = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  born: PropTypes.number.isRequired,
  died: PropTypes.number.isRequired,
  age: PropTypes.number.isRequired,
  century: PropTypes.number.isRequired,
  father: PropTypes.object,
  mother: PropTypes.object,
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Person.propTypes = {
  person: PropTypes.shape(PersonType).isRequired,
  selected: PropTypes.bool,
  onSelected: PropTypes.func,
};

Person.defaultProps = {
  selected: false,
  onSelected: () => {},
};

export default Person;
