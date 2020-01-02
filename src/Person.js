import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import PersonName from './PersonName';

const Person
  = ({ person, clickHandler, highlightedPart, people, location }) => {
    const { century, name } = person;
    const styledFields = ['name', 'children'];

    const personClassName
    = `${cn({
      Person: true,
      'Person--selected':
        location.pathname === `/people/${name.replace(/\s+/g, '-')
          .toLowerCase()}`,
    })} Person--lived-in-${century}`;

    return (
      <tr
        onClick={() => clickHandler(name)}
        className={personClassName}
      >
        {Object.keys(person).map(field => (
          <td
            key={field}
            className={cn({
              PeopleTable__cell: true,
              'Person--male': field === 'father',
              'Person--female': field === 'mother',
              'Person--born-before-1650': field === 'born'
              && person[field] < 1650,
              'Person--age-above-65': field === 'age' && person[field] >= 65,
            })}
          >
            {styledFields.includes(field)
              ? (
                <PersonName
                  names={typeof person[field] === 'string'
                    ? [person[field]] : person[field]}
                  highlight={highlightedPart}
                  people={people}
                />
              )
              : person[field]}
          </td>
        ))}
      </tr>
    );
  };

Person.propTypes = {
  clickHandler: PropTypes.func.isRequired,
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
  people: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(Person);
