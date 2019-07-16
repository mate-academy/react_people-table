import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Person = ({ person, index }) => {
  const personClasses = classnames(
    'person',
    `person--lived-in-${person.century}`,
    {
      'person--female': person.sex === 'f',
      'person--male': person.sex === 'm',
      'person--age': person.age > 65,
    }
  );

  const nameClasses = classnames(
    {
      'person--born': person.born < 1650,
      'person--died': person.died > 1800,
    }
  );

  const childNames = person.children.map(child => child.name);

  return (

    <tr
      tabIndex="0"
      className={personClasses}
    >
      <td>{index}</td>
      <td className={nameClasses}>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.age}</td>
      <td>{person.century}</td>
      <td>{person.motherName}</td>
      <td>{person.fatherName}</td>
      <td>{childNames.join(', ')}</td>
    </tr>
  );
};

Person.propTypes = {
  index: PropTypes.number.isRequired,
  person: PropTypes.shape({
    index: PropTypes.number,
    name: PropTypes.string,
    sex: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
    age: PropTypes.number,
    century: PropTypes.number,
    mother: PropTypes.object,
    father: PropTypes.object,
    motherName: PropTypes.string,
    fatherName: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default Person;
