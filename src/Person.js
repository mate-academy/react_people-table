import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import PersonName from './PersonName';

const Person = ({ person, headers }) => (
  <>
    {headers.map(header => (
      <td
        key={header}
        className={cn(
          header === 'name' && { 'born-before-1650': person.born < 1650 },
          header === 'age' && { older_than_65: person.age >= 65 },
          header === 'age' && { younger_than_65: person.age < 65 },
        )}
      >
        {(() => {
          switch (header) {
            case 'children':
              return (
                person[header].map(child => (
                  <div key={child.name}>
                    <PersonName person={child.name} sex={child.sex} />
                  </div>
                ))
              );
            case 'name':
              return (
                <PersonName
                  person={person[header]}
                  sex={person.sex}
                />
              );
            case 'father':
            case 'mother':
              return (
                <PersonName
                  person={person[header]}
                  sex={header === 'father' ? 'm' : 'f'}
                />
              );
            default: return person[header];
          }
        })()}
      </td>
    ))}
  </>
);

Person.propTypes = {
  person: PropTypes.objectOf(PropTypes.any).isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Person;
