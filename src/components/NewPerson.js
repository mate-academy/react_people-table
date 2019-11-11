import PropTypes from 'prop-types';
import React from 'react';

const NewPerson = ({ person, selected, onSelected }) => {
  const childNames = person.children.map(child => child.name);

  return (
    <tr
      className={selected ? 'person--selected' : ''}
      onClick={onSelected}
    >
      <td>{person.id}</td>
      <td
        className={person.born < 1650 ? 'person--born-before-1650' : ''}
      >
        {person.name}
      </td>
      <td
        className={person.sex === 'f' ? 'person--woman' : 'person--man'}
      >
        {person.sex}
      </td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td
        className={person.age >= 65 ? 'person--older-65' : ''}
      >
        {person.age}
      </td>
      <td>{person.century}</td>
      <td>{person.mother}</td>
      <td>{person.father}</td>
      <td>{childNames.join(', ')}</td>
    </tr>
  );
};

const PersonType = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  born: PropTypes.number.isRequired,
  died: PropTypes.number.isRequired,
  age: PropTypes.number.isRequired,
  century: PropTypes.number.isRequired,
  father: PropTypes.string,
  mother: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

NewPerson.propTypes = {
  person: PropTypes.shape(PersonType).isRequired,
  selected: PropTypes.bool,
  onSelected: PropTypes.func,
};

NewPerson.defaultProps = {
  selected: false,
  onSelected: () => {},
};

export default NewPerson;
