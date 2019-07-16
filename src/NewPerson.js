import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

const NewPerson = ({ showFormAddNewPerson, addNewPerson, closeForm }) => (
  <div className={showFormAddNewPerson ? 'shown-form' : 'hidden-form'}>
    <form
      className="form-wrap"
    >
      <label htmlFor="new-person-name">
        <input
          id="new-person-name"
          type="text"
          placeholder="enter name"
          className="input"
          required="true"
        />
      </label>
      <label
        htmlFor="new-person-sex__man"
        className="radio-btn"
      >
        <input
          id="new-person-sex__man"
          type="radio"
          value="m"
          name="sex"
        />
        Man
      </label>
      <label
        htmlFor="new-person-sex__woman"
        className="radio-btn"
      >
        <input
          id="new-person-sex__woman"
          type="radio"
          value="f"
          name="sex"
        />
        Woman
      </label>
      <label htmlFor="new-person-born">
        <input
          id="new-person-born"
          type="text"
          placeholder="enter born date"
          className="input"
          required="true"
        />
      </label>
      <label htmlFor="new-person-died">
        <input
          id="new-person-died"
          type="text"
          placeholder="enter died date"
          className="input"
          required="true"
        />
      </label>
      <label htmlFor="new-person-father">
        <input
          id="new-person-father"
          type="text"
          placeholder="enter father's name"
          className="input"
          required="true"
        />
      </label>
      <label htmlFor="new-person-mother">
        <input
          id="new-person-mother"
          type="text"
          placeholder="enter mother's name"
          className="input"
          required="true"
        />
      </label>
      <button
        type="submit"
        className="btn-add"
        onClick={addNewPerson}
      >
        Add
      </button>
      <button
        type="submit"
        className="btn-close"
        onClick={closeForm}
      >
        Close
      </button>
    </form>
  </div>
);

NewPerson.propTypes = {
  showFormAddNewPerson: PropTypes.bool,
  addNewPerson: PropTypes.func,
  closeForm: PropTypes.func,
};

NewPerson.defaultProps = {
  showFormAddNewPerson: false,
  addNewPerson: () => {},
  closeForm: () => {},
};

export default NewPerson;
