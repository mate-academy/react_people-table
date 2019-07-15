import React from 'react';
import './App.css';

const NewPerson = ({ showFormAddNewPerson, addNewPerson, closeForm }) => (
  <div className={showFormAddNewPerson ? 'shown-form' : 'hidden-form'}>
    <form
      className="form-wrap"
    >
      <label>
        <input
          type="text"
          placeholder="enter name"
          className="input"
          required="true"
        />
      </label>
      <label className="radio-btn">
        <input
          type="radio"
          value="m"
          name="sex"
        />
        Man
      </label>
      <label className="radio-btn">
        <input
          type="radio"
          value="f"
          name="sex"
        />
        Woman
      </label>
      <label>
        <input
          type="text"
          placeholder="enter born date"
          className="input"
          required="true"
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="enter died date"
          className="input"
          required="true"
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="enter father's name"
          className="input"
          required="true"
        />
      </label>
      <label>
        <input
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

export default NewPerson;
