import React from 'react';
import PropTypes from 'prop-types';

const Person = ({ person, select, selectedId }) => {
  const personSex = (person.sex === 'm')
    ? 'Person--male'
    : 'Person--female';

  const tooOld = (person.born < 1650)
    ? 'tooOld'
    : null;

  const longLiver = (person.age >= 65)
    ? 'longLiver'
    : null;

  const centuryClass = ` Person--lived-in-${person.century}`;
  const trClasses = personSex + centuryClass;
  const personSelected = (
    person.id === selectedId)
    ? 'Person--selected'
    : '';

  return (
    <tr
      onClick={() => select(person.id)}
      className={`${trClasses} ${personSelected}`}
    >
      <td>{person.id}</td>
      <td className={tooOld}>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td className={longLiver}>{person.age}</td>
      <td>{person.century}</td>
      <td>{person.father}</td>
      <td>{person.mother}</td>
      <td>{person.children}</td>
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
    father: PropTypes.string,
    mother: PropTypes.string,
  }).isRequired,
  select: PropTypes.func.isRequired,
  selectedId: PropTypes.number.isRequired,
};

export default Person;
