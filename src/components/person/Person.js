import React from 'react';
import PropTypes from 'prop-types';

class Person extends React.Component {
  render(){
    const {
      selectPerson,
      person: {
        id,
        name,
        sex,
        born,
        died,
        mother,
        father,
        age,
        century,
        selected,
      }
    } = this.props;

    return (
      <tr className={selected === true ? 'Person' : ''} onClick={() => selectPerson(id)}>
        <td>{id}</td>
        <td className={born < 1650 ? 'lineThrough' : ''}>{name}</td>
        <td className={sex === 'm' ? 'male' : 'female'}>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>{father}</td>
        <td>{mother}</td>
        <td className={age >= 65 ? 'moreThen65' : ''}>{age}</td>
        <td>{century}</td>
      </tr>
    )
  }
}

Person.propTypes = {
  peopleList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Person;
