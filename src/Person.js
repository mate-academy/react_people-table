import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const Person = ({ person, clickHandler, personSelected, highlightedPart }) => {
  const getHighlightedText = (text, highlight) => {
    const parts = (text || '').split(new RegExp(`(${highlight})`, 'gi'));

    return parts.map((part, i) => (
      <span key={`${part + i}`}>
        {part.toLowerCase() === highlight.toLowerCase()
          ? <span className="highlighted">{part}</span> : part}
      </span>
    ));
  };

  const { id, name, sex, died, born, age, father, mother, century } = person;
  const personClassName = `Person ${cn({
    'Person--male': sex === 'm',
    'Person--female': sex === 'f',
  })} Person--lived-in-${century}
    ${personSelected === id ? 'Person--selected' : ''}`;
  const bornClass = cn({ 'Person--born-before-1650': born < 1650 });
  const ageClass = cn({ 'Person--age-above-65': age >= 65 });

  return (
    <tr
      onClick={() => clickHandler(id)}
      className={personClassName}
    >
      <td>{id}</td>
      <td className={`${bornClass} PeopleTable__cell`}>
        {getHighlightedText(name, highlightedPart)}
      </td>
      <td className="PeopleTable__cell">{sex}</td>
      <td className="PeopleTable__cell">{born}</td>
      <td className="PeopleTable__cell">{died}</td>
      <td className="PeopleTable__cell">
        {getHighlightedText(father, highlightedPart)}
      </td>
      <td className="PeopleTable__cell">
        {getHighlightedText(mother, highlightedPart)}
      </td>
      <td className={`${ageClass} PeopleTable__cell`}>{age}</td>
      <td className="PeopleTable__cell">{century}</td>
    </tr>
  );
};

Person.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  personSelected: PropTypes.number.isRequired,
  highlightedPart: PropTypes.string.isRequired,
  person: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired,
    father: PropTypes.string,
    mother: PropTypes.string,
    century: PropTypes.number.isRequired,
  }).isRequired,
};

export default Person;
