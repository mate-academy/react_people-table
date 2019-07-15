import React from 'react';
import classNames from 'classnames';
import { personPropTypes } from '../propTypes';
import './Person.css';

const Person = ({
  person, selectedId, handlePersonClick, titles,
}) => {
  const personClasses = classNames(
    'person',
    `person--lived-in-${person.century}`,
    {
      'person--female': person.sex === 'f',
      'person--male': person.sex === 'm',
      'person--age-more': person.age > 65,
      'person--mother': person.children.length && person.sex === 'f',
      'person--father': person.children.length && person.sex === 'm',
      'person--selected': selectedId === person.id,
    }
  );

  const personNameClasses = classNames({
    'person--born-before': person.born < 1650,
    'person--died-after': person.died > 1800,
  });

  return (
    <tr onClick={() => handlePersonClick(person.id)} className={personClasses}>
      {titles.map((title) => {
        const lowerTitle = title.name.toLowerCase();
        return lowerTitle === 'children' ? (
          <td>
            {person[lowerTitle].map(child => child.name).join(', ') || 'None'}
          </td>
        ) : (
          <td className={lowerTitle === 'name' ? personNameClasses : ''}>
            {person[lowerTitle]}
          </td>
        );
      })}
    </tr>
  );
};

Person.propTypes = personPropTypes;

export default Person;
