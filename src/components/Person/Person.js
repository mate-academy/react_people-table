import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Person.css';

const Person = ({ person, selectedPerson, setSelected }) => {
  const {
    id,
    name,
    sex,
    age,
    century,
    born,
    died,
    mother,
    father,
    children,
  } = person;

  return (
    <tr
      onClick={() => setSelected(id)}
      className={`
       person
       ${sex === 'f' ? 'person--female' : 'person--male'}
       ${age > 65 && 'border-green'}
       person--lived-in-${century}
       ${children.length && (sex === 'f' ? 'person--mother' : 'person--father')}
       ${selectedPerson === id && 'person--selected'}
      `}
    >
      <td>{id}</td>
      <td
        className={`
          ${born < 1650 && 'line-through'}
          ${died > 1800 && 'bold'}
        `}
      >
        {name}
      </td>
      <td>{sex}</td>
      <td>{age}</td>
      <td>{century}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother || 'None'}</td>
      <td>{father || 'None'}</td>
      <td>{children.map(child => child.name).join(', ') || 'None'}</td>
    </tr>
  );
};

Person.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    century: PropTypes.number.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    mother: PropTypes.string.isRequired,
    father: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  selectedPerson: PropTypes.number.isRequired,
  setSelected: PropTypes.func.isRequired,
};

const mapState = ({ selectedPerson }) => ({
  selectedPerson,
});

const mapDispatch = dispatch => ({
  setSelected: rowId => dispatch({ type: 'SET_SELECTED_ROW', rowId }),
});

export default connect(
  mapState,
  mapDispatch
)(Person);
