import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Person = ({ people, history, match, location, selectText }) => {
  const selectedText = (data) => {
    const text = selectText;

    if (!text || !String(data).toLowerCase().includes(text)) {
      return data;
    }

    if (!data) {
      return '';
    }

    const result = [];

    for (let i = 0; i < data.length; i += 1) {
      const str = data.slice(i, i + text.length);

      if (str.toLowerCase() === text) {
        result.push(<span className="select--text">{str}</span>);
        i += str.length - 1;
      } else {
        result.push(data[i]);
      }
    }

    return result;
  };

  const handlePerson = person => (
    history.push({
      pathname: `/people/${person.name.toLowerCase().replace(/ /g, '_')}`,
      search: location.search,
    })
  );

  return (
    people.map(person => (
      <tr
        key={person.name}
        className={
          cn(person.sex === 'm' ? 'person--male' : 'person--female',
            `Person--lived-in-${Math.ceil(person.died / 100)}`,
            { selected: person.name.toLowerCase().replace(/ /g, '_')
              === match.params.person })}
        onClick={() => handlePerson(person)}
      >
        {Object.values(person).map(data => (
          data === person.name
            ? (
              <td className={person.born < 1650 ? 'person--born' : ''}>
                {selectedText(data)}
              </td>
            )
            : <td>{selectedText(data)}</td>
        ))}
      </tr>
    ))
  );
};

Person.propTypes = {
  people: PropTypes.arrayOf.isRequired,
  selectText: PropTypes.string.isRequired,
};

export default Person;
