import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Person
  = (
    { person:
       { id, name, sex, born, died, mother, father, age, century },
    history, match, location }
  ) => {
    const sexOfPerson = [...sex].toString();
    const bornBefore1650 = born < 1650;
    const ageOver65YearsOld = age >= 65;

    const clickHandler = () => {
      history.push({
        pathname: `/people/${name.split(' ').join('-').toLowerCase()}`,
        search: location.search,
      });
    };

    return (
      <tr
        onClick={() => clickHandler()}
        className={
          match.params.selectedUser === name
            .split(' ').join('-').toLowerCase() ? 'selected' : ''}
      >
        <td>{id}</td>
        <td className={
          bornBefore1650
            ? 'bornBefore1650'
            : null
        }
        >
          {name}
        </td>
        <td className={
          sexOfPerson === 'm'
            ? 'person--male'
            : 'person--female'
        }
        >
          {sex}
        </td>
        <td>{born}</td>
        <td>{died}</td>
        <td>{mother}</td>
        <td>{father}</td>
        <td className={
          ageOver65YearsOld
            ? 'ageOver65YearsOld'
            : null
        }
        >
          {age}
        </td>
        <td className={
          `person--lived-in-${century}`
        }
        >
          {century}
        </td>
      </tr>
    );
  };

Person.propTypes = {
  person: PropTypes.oneOfType([PropTypes.object])
    .isRequired,
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default Person;
