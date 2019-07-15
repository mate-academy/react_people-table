import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import classNames from 'classnames/bind';

class Person extends React.Component {
  state = {
    selectedPersonId: null,
  };

  render() {
    const { person } = this.props;
    const { selectedPersonId } = this.state;

    return (
      <tr
        key={person.id}
        onClick={() => this.setState({ selectedPersonId: person.id })}
        className={classNames({
          PeopleTable__row: true,
          'PeopleTable__row--selected': person.id === selectedPersonId,
          people__old_65: ((person.died - person.born) > 65),
        })}
      >
        <td>
          {person.id}
        </td>
        <td
          className={classNames({
            PeopleTable__row: true,
            'people__Born--Before_1650': person.born < 1650,
            'people__Died--Before_1800': person.died > 1800,
          })}
        >
          {person.name}
        </td>
        <td
          className={classNames({
            PeopleTable__row: true,
            'person--male': person.sex === 'm',
            'person--female': person.sex === 'f',
          })}
        >
          {person.sex}
        </td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>{person.mother}</td>
        <td
          className={classNames({
            'person--father': person.sex === 'm' && person.children.length > 0,
          })}
        >
          {person.father}
        </td>
        <td>{person.age}</td>
        <td
          className={classNames({
            PeopleTable__row: true,
            [`person--lived-in-${person.century}`]: true,
          })}
        >
          {person.century}
        </td>
        <td>
          {person.children.join(', ')}
        </td>
      </tr>
    );
  }
}

Person.propTypes = {
  person: PropTypes.shape({
    sex: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    mother: PropTypes.string.isRequired,
    father: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    century: PropTypes.number.isRequired,
    children: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Person;
