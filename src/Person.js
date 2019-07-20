import React from 'react';
import PropTypes from 'prop-types';

const Person = ({ person, selectFunction, selectedPeople }) => {
  const setClassForRow = () => {
    let classString = '';

    classString += person.sex === 'm' ? 'person--male' : 'person--female';
    classString += person.age > 65 ? ' older65' : '';
    classString += ` person--lived-in-${person.century}`;

    if (person.children[0]) {
      classString += person.sex === 'm' ? ' person--father' : ' person--mother';
    }

    if (selectedPeople.includes(person.id)) {
      classString += ' selectedRow';
    }

    return classString;
  };

  const setClassForName = () => {
    if (person.born < 1650) {
      return 'before1650';
    }

    if (person.died > 1800) {
      return 'after1800';
    }

    return '';
  };

  const handleSelect = (id) => {
    selectFunction(id);
  };

  return (
    <tr
      key={person.id}
      className={setClassForRow()}
      onClick={() => handleSelect(person.id)}
    >
      <td>{person.id}.</td>
      <td className={setClassForName()}>{person.name}</td>
      <td>{person.sex === 'm' ? 'Male' : 'Female'}</td>
      <td>{person.born >= 0 ? person.born : `${person.born * -1} BC`}</td>
      <td>{person.died >= 0 ? person.died : `${person.died * -1} BC`}</td>
      <td>{person.age}</td>
      <td>{person.century}-th</td>
      <td>{person.mother}</td>
      <td>{person.father}</td>
      <td>{person.children[0]
        ? person.children.map(child => child.name).join(', ')
        : null}
      </td>
    </tr>
  );
};

Person.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    sex: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
    age: PropTypes.number,
    century: PropTypes.number,
    mother: PropTypes.string,
    father: PropTypes.string,
    children: PropTypes.array,
  }),
  selectFunction: PropTypes.func,
  selectedPeople: PropTypes.arrayOf(PropTypes.number),
};

export default Person;
