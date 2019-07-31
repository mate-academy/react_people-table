import React from 'react';
import propTypes from 'prop-types';

const classNames = require('classnames');

function Human(props) {
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
      key={id}
      className={personRowClass}
      onClick={() => {
        handler(id);
      }}
    >
      <td className="centered">{id}</td>
      <td className={personClassNameStyle}>{name}</td>
      <td className="centered">{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{age}</td>
      <td className="centered">{century}</td>
      <td>{mother}</td>
      <td>{father}</td>
      <td>
        {children !== undefined
          ? children.map(
            (child, index) => (index !== children.length - 1 ? `${child.name}, `
              : `${child.name}`)
          ) : ''
        }
      </td>
    </tr>
  );
}

Human.propTypes = {
  personData: propTypes.shape({}).isRequired,
  handler: propTypes.func.isRequired,
  selectedPerson: propTypes.number,
};
Human.defaultProps = {
  selectedPerson: null,
};

export default Human;
