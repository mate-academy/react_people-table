import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const PersonInfo = ({ person, onSelected, selected }) => {
  const personClasses = classnames(
    'person',
    `person__lived-in-${person.century}`,
    {
      'person--selected': selected,
      person__female: person.sex === 'f',
      person__male: person.sex === 'm',
      'person__lived-at-least-65': person.age > 65,
      person__father: person.sex === 'm' && person.children.length > 0,
      person__mother: person.sex === 'f' && person.children.length > 0,
    }
  );
  const personNameClasses = classnames(
    {
      'person__born-before-1650': person.born < 1650,
      'person__died-after-1800': person.died > 1800,
    }
  );

  return (
    <tr
      className={personClasses}
      onClick={onSelected}
    >
      <td>{person.id}</td>

      <td
        className={personNameClasses}
      >
        {person.name}
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.age}</td>
      <td>
        {person.mother === null || person.mother === ''
          ? 'unknown'
          : person.mother
        }
      </td>
      <td>
        {person.father === null || person.father === ''
          ? 'unknown'
          : person.father
        }
      </td>
      <td>
        {person.children.length > 0
          ? person.children.join(', ')
          : 'unknown'
        }
      </td>
    </tr>
  );
};

PersonInfo.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number,
    century: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number,
    age: PropTypes.number.isRequired,
    mother: PropTypes.string,
    father: PropTypes.string,
    children: PropTypes.array,
  }).isRequired,
  onSelected: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default PersonInfo;
