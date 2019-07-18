import React from 'react';
import propTypes from 'prop-types';

const classNames = require('classnames');

function People(props) {
  const {
    name, age, sex, century, children,
    id, died, born, mother, father,
  } = props.personData;
  const { handler, selectedPerson } = props;
  const personRowClass = classNames({
    'person PeopleTable__row': true,
    'PeopleTable__row--selected': id === selectedPerson,
    'person--female': sex === 'f',
    'person--male': sex === 'm',
    'green_border-style': age > 65,
    'person--mother': children !== undefined && sex === 'f',
    'person--father': children !== undefined && sex === 'm',
    [`person--lived-in-${century}`]: true,
  });
  const personClassNameStyle = classNames({
    'born-before-1650': born < 1650,
    'died-after-1800': died > 1800,
  });

  return (
    <tr
      key={`user_${id}`}
      className={personRowClass}
      onClick={() => {
        handler(id);
      }}
    >
      <td key={`user_${id}_id`} className="centered">{id}</td>
      <td key={`user_${id}_name`} className={personClassNameStyle}>{name}</td>
      <td key={`user_${id}_sex`} className="centered">{sex}</td>
      <td key={`user_${id}_born`}>{born}</td>
      <td key={`user_${id}_died`}>{died}</td>
      <td key={`user_${id}_age`}>{age}</td>
      <td key={`user_${id}_century`} className="centered">{century}</td>
      <td key={`user_${id}_mother`}>{mother}</td>
      <td key={`user_${id}_father`}>{father}</td>
      <td key={`user_${id}_children`}>
        {children !== undefined
          ? children.map(child => `${child.name},`) : ''
        }
      </td>
    </tr>
  );
}

People.propTypes = {
  personData: propTypes.shape({}).isRequired,
  handler: propTypes.func.isRequired,
  selectedPerson: propTypes.number,
};
People.defaultProps = {
  selectedPerson: null,
};

export default People;
