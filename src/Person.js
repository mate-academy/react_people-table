import React from 'react';
import propTypes from 'prop-types';
import './styles/person.css';
import classnames from 'classnames';

const Person = ({ person, selected, onSelected }) => {
  const classes = classnames(
    'Person',
    `Person--lived-in-${person.century}`,
    {
      'Person--selected': selected,
      'Person--man': person.sex === 'm',
      'Person--woman': person.sex === 'f',
      'Person--long-liver': person.age >= 65,
    }
  );

  return (
    <tr
      key={person.id}
      className={classes}
      onClick={onSelected}
    >
      <td className="person__item">{person.id}</td>
      <td className="person__item">{person.name}</td>
      <td className="person__item">{person.sex}</td>
      <td className="person__item">{person.born}</td>
      <td className="person__item">{person.died}</td>
      <td className="person__item">{person.age}</td>
      <td className="person__item">{person.century}</td>
      <td className="person__item">{person.mother}</td>
      <td className="person__item">{person.father}</td>
      <td className="person__item">{person.children}</td>
    </tr>
  );
};

const PersonName = ({ person }) => (
  <b style={{ color: person.sex === 'm' ? 'blue' : 'red' }}>
    { person.name }
  </b>
);

const PersonType = {
  id: propTypes.number.isRequired,
  born: propTypes.number.isRequired,
  died: propTypes.number.isRequired,
  age: propTypes.number.isRequired,
  century: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  sex: propTypes.string.isRequired,
  mother: propTypes.string.isRequired,
  father: propTypes.string.isRequired,
  children: propTypes.array.isRequired,
};

Person.propTypes = {
  person: propTypes.shape(PersonType).isRequired.isRequired,
  selected: propTypes.bool,
  onSelected: propTypes.func,
};

Person.defaultProps = {
  selected: false,
  onSelected: () => {},
};

PersonName.propTypes = {
  person: propTypes.shape().isRequired,
};
export default Person;
