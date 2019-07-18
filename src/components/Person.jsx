import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Person = ({ person, selected, onSelected }) => {
  const childNames = person.children.map(child => child.name);

  const classes = classnames(
    'person',
    `person--lived-in-${person.century}`,
    {
      'person--selected': selected,
      'person--man': person.sex === 'm',
      'person--woman': person.sex === 'f',
      'person--long-liver': person.age >= 65,
      'person--mother': person.sex === 'f' && childNames.join(),
      'person--father': person.sex === 'm' && childNames.join(),
      'person--older-65': person.age > 65,
    }
  );

  return (
    <tr
      className={classes}
      onClick={onSelected}
    >
      <td>{person.id}</td>
      <td className={classnames({
        'person--borned-before-1650': person.born < 1650,
        'person--died-after-1800': person.died > 1800,
      })}
      >
        {person.name}
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.age}</td>
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
