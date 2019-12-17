import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class PersonRow extends React.Component {
  render() {
    const { id, sex, born, age, century } = this.props.person;
    const {
      selected,
      handleClick,
      headers,
      person,
    } = this.props;

    return (
      <tr
        className={
          cn(
            'person',
            `person person--lived-in-${century}`,
            sex === 'm' ? 'person--male' : 'person--female',
            { 'person--selected': selected }
          )}
        onClick={() => handleClick(id)}
      >
        {headers.map(header => (
          <td
            key={header.code}
            className={
              cn(
                header.code === 'name'
                  person__bornBefore1650: header.code === 'name' && born < 1650 
                header.code === 'age'
                  && { person__after65: age >= 65 }
              )
            }
          >
            {person[header.code]}
          </td>
        ))}
      </tr>
    );
  }
}

PersonRow.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number,
    sex: PropTypes.string,
    born: PropTypes.number,
    age: PropTypes.number,
    century: PropTypes.number,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  headers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PersonRow;
