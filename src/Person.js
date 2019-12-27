import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import PersonName from './PersonName';

const Person = ({ titles, person, isSelected, selectPerson }) => (
  <tr
    className={
      cn(
        'person',
        `person--lived-in-${person.century}`,
        { 'person--selected': isSelected }
      )}
    onClick={selectPerson}
  >
    {titles.map((title) => {
      switch (title) {
        case 'name':
          return (
            <td className={cn(
              { 'person--born-before-1650': person.born < 1650 },
              { 'person--died-after-1800': person.died > 1800 },
            )}
            >
              <PersonName name={person.name} sex={person.sex} />
            </td>
          );
        case 'sex':
          return (
            <td className={cn(
              { 'person--male': person.sex === 'm' },
              { 'person--female': person.sex === 'f' },
            )}
            >
              {person.sex}
            </td>
          );
        case 'died':
          return (
            <td>{person.died < Infinity ? person.died : 'alive'}</td>
          );
        case 'age':
          return (
            <td
              className={cn({ 'person--old': person.age >= 65 })}
            >
              {person.age}
            </td>
          );
        case 'mother':
          return (
            <td>
              {person.mother !== '' && (
                <PersonName name={person.mother} sex="f" />
              )}
            </td>
          );
        case 'father':
          return (
            <td>
              {person.father !== '' && (
                <PersonName name={person.father} sex="m" />
              )}
            </td>
          );
        case 'children':
          return (
            <td>
              {person.children.map((child, index) => (
                <>
                  <PersonName name={child.name} sex={child.sex} />
                  {index !== person.children.length - 1 && ', '}
                </>
              ))}
            </td>
          );
        default:
          return (
            <td>{person[title]}</td>
          );
      }
    })}
  </tr>
);

Person.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  person: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired,
    mother: PropTypes.string.isRequired,
    father: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      sex: PropTypes.string,
    })).isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  selectPerson: PropTypes.func.isRequired,
};

export default Person;
