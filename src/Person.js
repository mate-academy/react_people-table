import PropTypes from 'prop-types';
import React from 'react';

const Person = ({ person, isSelected, selectPerson }) => {
  const trClassName = (currentPerson) => {
    let name = 'person';

    name += ` person--lived-in-${currentPerson.century}`;
    name += isSelected ? ' person--selected' : '';
    name += currentPerson.sex === 'm' ? ' person--man' : ' person--woman';

    return name;
  };

  const tdNameClassName = (currentPerson) => {
    let name = '';

    if (currentPerson.born < 1650) {
      name += 'person--born-before-1650';
    }

    if (currentPerson.died > 1800) {
      name += 'person--died-after-1800';
    }

    return name;
  };

  return (
    <tr
      className={trClassName(person)}
      onClick={selectPerson}
    >
      <td>{person.id}</td>
      <td className={tdNameClassName(person)}>
        {person.name}
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died < Infinity ? person.died : ''}</td>
      <td
        className={person.age >= 65 ? 'person--old' : ''}
      >
        {person.age}
      </td>
      <td>{person.century}</td>
      <td>{person.mother}</td>
      <td>{person.father}</td>
      <td>{person.children}</td>
    </tr>
  );
};

Person.propTypes = {
  person: PropTypes.oneOfType(Object).isRequired,
  isSelected: PropTypes.bool.isRequired,
  selectPerson: PropTypes.func.isRequired,
};

export default Person;
