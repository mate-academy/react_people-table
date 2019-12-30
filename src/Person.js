import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import PropTypes from 'prop-types';
import PersonName from './PersonName';

const Person = ({ personData, headers }) => {
  const name = personData.name.split(' ').join('-').toLowerCase();

  return (
    <>
      {headers.map(header => (
        <td
          key={header}
          className={cn(
            header === 'name' && { 'born-before-1650': personData.born < 1650 },
            header === 'age' && { older_than_65: personData.age >= 65 },
            header === 'age' && { younger_than_65: personData.age < 65 },
          )}
        >
          {(() => {
            switch (header) {
              case 'children':
                return (
                  personData[header].map(child => (
                    <div key={child.name}>
                      <NavLink
                        className="link"
                        to={`/people/${name}`}
                        key={personData.name}
                      >
                        <PersonName person={child.name} sex={child.sex} />
                      </NavLink>
                    </div>
                  ))
                );
              case 'name':
                return (
                  <NavLink
                    className="link"
                    to={`/people/${name}`}
                    key={personData.name}
                  >
                    <PersonName
                      person={personData[header]}
                      sex={personData.sex}
                    />
                  </NavLink>
                );
              case 'father':
              case 'mother':
                return (
                  <NavLink
                    className="link"
                    to={`/people/${name}`}
                    key={personData.name}
                  >
                    <PersonName
                      person={personData[header]}
                      sex={header === 'father' ? 'm' : 'f'}
                    />
                  </NavLink>
                );
              default: return (
                <NavLink
                  className="link"
                  to={`/people/${name}`}
                  key={personData.name}
                >
                  {personData[header]}
                </NavLink>
              );
            }
          })()}
        </td>
      ))}
    </>
  );
};

Person.propTypes = {
  personData: PropTypes.objectOf(PropTypes.any).isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Person;
