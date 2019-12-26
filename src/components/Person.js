import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const Person = ({ person, selectedRow, selectRow }) => {
  const trClass = ClassNames(
    { person: true },
    { 'person--male': person.sex === 'm' },
    { 'person--female': person.sex === 'f' },
    { [`person--lived-in-${Math.ceil(person.died / 100)}`]: true },
    { 'person--selected': person.id === selectedRow }
  );
  const nameClass = ClassNames(
    { person__cell: true },
    { person__name: true },
    { person__former: person.born < 1650 }
  );
  const ageClass = ClassNames(
    { person__cell: true },
    { 'person__long-living': person.died - person.born >= 65 }
  );

  return (
    <tr
      className={trClass}
      onClick={() => selectRow(person.id)}
    >
      <td className="person__cell person__cell--first">
        {person.id}
        .
      </td>
      <td className={nameClass}>{person.name}</td>
      <td className="person__cell">{person.sex}</td>
      <td className="person__cell">{person.born}</td>
      <td className="person__cell">{person.died}</td>
      <td className="person__cell">{person.father}</td>
      <td className="person__cell">{person.mother}</td>
      <td className={ageClass}>{person.age}</td>
      <td className="person__cell">{person.century}</td>
      <td className="person__cell person__children">
        {person.children.length === 0
          ? 'none'
          : person.children[0]}
        {person.children.length > 0 && (
          <ul className="person__children-list">
            {person.children.map(child => (
              <li key={child}>{child}</li>
            ))}
          </ul>
        )}
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
    father: PropTypes.string,
    mother: PropTypes.string,
    age: PropTypes.number,
    century: PropTypes.number,
    children: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  selectedRow: PropTypes.number.isRequired,
  selectRow: PropTypes.func.isRequired,
};

export default Person;
