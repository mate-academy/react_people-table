import React from 'react';
import PropTypes from 'prop-types';
import './Person.css';

const classNames = require('classnames');

const Person = (props) => {
  const {
    people, handlePersonRowClick, personRowSelectedId, personRowSelected,
  } = props;

  const getChildrenString = (person, peopleArr) => (peopleArr
    .filter(child => child.father === person.name
      || child.mother === person.name)
    .map(child => child.name)
    .join(', ')
  );

  const getClassByBornAndDied = person => (
    classNames({
      'born-before-1650': person.born < 1650,
      'died-after-1800': person.died > 1800,
    })
  );

  const getClassByChildSexSelected = (person, peopleArr) => (
    classNames({
      person: true,
      'person--selected': person.id === personRowSelectedId
        && personRowSelected,
      'person--female': person.sex === 'f',
      'person--mother': person.children !== '' && person.sex === 'f',
      'person--male': person.sex === 'm',
      'person--father': getChildrenString(person, peopleArr)
        && person.sex === 'm',
    })
  );

  const personData = people.map((person, personIndex, peopleArr) => (
    <tr
      key={person.id + person.name}
      className={getClassByChildSexSelected(person, peopleArr)}
      onClick={() => handlePersonRowClick(person.id)}
    >
      <td>{person.id}</td>
      <td className={getClassByBornAndDied(person)}>
        {person.name}
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.father}</td>
      <td>{person.mother}</td>
      <td className={person.age > 65 ? 'longLife' : 'ohSoShortLife'}>
        {person.age}
      </td>
      <td className={`person--lived-in-${person.century}`}>{person.century}</td>
      <td>{person.children}</td>
    </tr>
  ));

  return (
    <tbody>
      {personData}
    </tbody>
  );
};

Person.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  handlePersonRowClick: PropTypes.func.isRequired,
  personRowSelected: PropTypes.bool.isRequired,
  personRowSelectedId: PropTypes.string.isRequired,
};

export default Person;
