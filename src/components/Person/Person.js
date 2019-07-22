/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { setSelected } from '../redux/users';
import titles from '../api/titles';

const Person = ({ person, selectedPerson, setSelected }) => {
  const personClasses = classNames(
    'person',
    `person--lived-in-${person.century}`,
    {
      'person--female': person.sex === 'f',
      'person--male': person.sex === 'm',
      'person--age-more': person.age > 65,
      'person--mother': person.children.length && person.sex === 'f',
      'person--father': person.children.length && person.sex === 'm',
      'person--selected': selectedPerson === person.id,
    }
  );

  return (
    <tr onClick={() => setSelected(person.id)} className={personClasses}>
      {titles.map((title) => {
        const lowerTitle = title.name.toLowerCase();
        switch (lowerTitle) {
          case 'children':
            return (
              <td>
                {person[lowerTitle].map(child => child.name).join(', ')
                  || 'None'}
              </td>
            );

          default:
            return <td>{person[lowerTitle] || 'None'}</td>;
        }
      })}
    </tr>
  );
};

const childrenTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
});

Person.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    century: PropTypes.number.isRequired,
    motherName: PropTypes.string.isRequired,
    fatherName: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(childrenTypes).isRequired,
  }).isRequired,
  selectedPerson: PropTypes.number.isRequired,
  setSelected: PropTypes.func.isRequired,
};

const mapState = ({ users }) => ({ selectedPerson: users.selectedPerson });
const mapDispatch = { setSelected };
export default connect(
  mapState,
  mapDispatch
)(Person);
