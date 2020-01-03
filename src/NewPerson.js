import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewPerson = ({ addPerson, people }) => {
  const [nameInput, setNameInput] = useState('');
  const [motherSelected, setMotherSelected] = useState('');
  const [fatherSelected, setFatherSelected] = useState('');
  const [bornSelected, setBornSelected] = useState('');
  const [diedSelected, setDiedSelected] = useState('');
  const [id, setId] = useState(40);
  const [sexSelected, setSex] = useState('f');
  const [childrenInput, setChildrenInput] = useState('');

  const currentYear = new Date().getFullYear();

  const handleInputChange = (event, setInputFunction, allowComma) => {
    const pattern = allowComma ? /[^\sa-z,]/gi : /[^\sa-z]/gi;

    setInputFunction(event.target.value.replace(pattern, '').trimLeft());
  };

  const handleSelect = (event, selectFunction, isNumber) => {
    selectFunction(isNumber ? +event.target.value : event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    addPerson({
      id,
      name: nameInput.trim(),
      sex: sexSelected,
      born: bornSelected,
      died: diedSelected || '',
      father: fatherSelected,
      mother: motherSelected,
      age: (diedSelected || currentYear) - bornSelected,
      century: Math.ceil((diedSelected || currentYear) / 100),
      children: childrenInput.split(',').map(child => child.trim()),
    });

    setNameInput('');
    setSex('');
    setBornSelected(0);
    setDiedSelected(0);
    setMotherSelected('');
    setFatherSelected('');
    setId(id + 1);
    setChildrenInput('');
  };

  return (
    <>
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <input
          className="input"
          type="text"
          value={nameInput}
          placeholder="Enter the name"
          maxLength={30}
          onChange={event => handleInputChange(event, setNameInput)}
          required
        />

        <div className="form__field">
          <select
            className="input input_select"
            onChange={event => handleSelect(event, setBornSelected, true)}
            value={bornSelected}
            required
          >
            {<option value="">Birth Year</option>}
            {[...Array(320).keys()]
              .map(year => (
                <option key={year}>{year + 1700}</option>
              ))}
          </select>

          <select
            className="input input_select"
            onChange={event => handleSelect(event, setDiedSelected, true)}
            value={diedSelected}
            required
          >
            {bornSelected > currentYear - 150
              ? <option value={0}>N/A</option>
              : <option value="">Death Year</option>}
            {bornSelected && [...Array(150).keys()]
              .map((year) => {
                if (year + bornSelected > currentYear) {
                  return null;
                }

                return (
                  <option key={year}>{year + bornSelected}</option>
                );
              })}
          </select>
        </div>

        <div className="form__field">
          <select
            className="input input_select"
            onChange={event => handleSelect(event, setMotherSelected)}
            value={motherSelected}
            required="required"
          >
            {<option value="">Choose mother</option>}
            {bornSelected && people
              .filter(({ sex, died }) => sex === 'f' && died >= bornSelected)
              .map(({ name }) => (
                <option key={name}>{name}</option>
              ))}
          </select>

          <select
            className="input input_select"
            onChange={event => handleSelect(event, setFatherSelected)}
            value={fatherSelected}
            required="required"
          >
            {<option value="">Choose father</option>}
            {bornSelected && people
              .filter(({ sex, died }) => sex === 'm' && died >= bornSelected)
              .map(({ name }) => (
                <option key={name}>{name}</option>
              ))}
          </select>
        </div>

        <div className="form__field form__field_sex">
          <label htmlFor="f">
            <input
              type="radio"
              className="input_radio"
              title=""
              id="f"
              value="f"
              onChange={event => handleSelect(event, setSex)}
              checked={sexSelected === 'f'}
            />
              female
          </label>
          <label htmlFor="m">
            <input
              type="radio"
              className="input_radio"
              title=""
              id="m"
              value="m"
              onChange={event => handleSelect(event, setSex)}
              checked={sexSelected === 'm'}
              required="required"
            />
              male
          </label>
        </div>

        <input
          className="input"
          type="text"
          value={childrenInput}
          placeholder="Enter children's names"
          maxLength={100}
          onChange={event => handleInputChange(event, setChildrenInput, true)}
          required
        />

        <button
          className="button button_form"
          type="submit"
        >
            Add
        </button>
      </form>
    </>
  );
};

NewPerson.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
  })).isRequired,
  addPerson: PropTypes.func.isRequired,
};

export default NewPerson;
