import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class Person extends React.Component {
  render() {
    const {
      id,
      name,
      sex,
      born,
      died,
      age,
      century,
      mother,
      father,
    } = this.props.person;
    const {
      selected,
      handleClick,
    } = this.props;

    return (
      <tr
        className={
          ClassNames(
            'person',
            `person person--lived-in-${century}`,
            sex === 'm' ? 'person--male' : 'person--female',
            { 'person--selected': selected }
          )}
        onClick={() => handleClick(id)}
      >
        <td>{id}</td>
        <td className={
          ClassNames({ person__bornBefore1650: born < 1650 })
        }
        >
          {name}
        </td>
        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td className={ClassNames({ person__after65: age >= 65 })}>{age}</td>
        <td>{century}</td>
        <td>{mother}</td>
        <td>{father}</td>
      </tr>
    );
  }
}

Person.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    sex: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
    age: PropTypes.number,
    century: PropTypes.number,
    mother: PropTypes.string || PropTypes.null,
    father: PropTypes.string || PropTypes.null,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Person;
