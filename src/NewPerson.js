import React, { useState } from 'react';
import PropTypes from 'prop-types';

const date = new Date();

const NewPerson = ({ currentPeople, addPerson, updateChildren, history }) => {
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [born, setBorn] = useState('');
  const [died, setDied] = useState('');
  const [mother, setMother] = useState('');
  const [father, setFather] = useState('');

  const setters = {
    name: setName,
    sex: setSex,
    born: setBorn,
    died: setDied,
    mother: setMother,
    father: setFather,
  };

  const handleNameChange = ({ target: { value } }) => {
    setName(value.replace(/^ |[^a-zA-Z|\s]+/g, ''));
  };

  const handleSelect = ({ target: { value } }, key) => {
    setters[key](value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    addPerson(name.trim(), sex, born, died, mother, father);
    updateChildren();

    setName('');
    setSex(sex);
    setBorn('');
    setDied('');
    setMother('');
    setFather('');

    history.push('/people');
  };

  const availableYears = [];
  const minWomanBirth = Math.min(...currentPeople
    .filter(person => person.sex === 'f')
    .map(person => person.born));
  const minManBirth = Math.min(...currentPeople
    .filter(person => person.sex === 'm')
    .map(person => person.born));

  for (let i = Math.max(minWomanBirth, minManBirth) + 16;
    i <= date.getFullYear(); i += 1) {
    availableYears.push(i);
  }

  return (
    <form
      className="new-person"
      onSubmit={handleSubmit}
    >

      <input
        type="text"
        value={name}
        placeholder="Enter name"
        onChange={handleNameChange}
        className="new-person__name"
        required
      />

      <input
        type="radio"
        name="sex"
        value="m"
        required={sex === ''}
        id="male"
        onChange={event => handleSelect(event, 'sex')}
      />
      <label htmlFor="male">male</label>
      <input
        type="radio"
        name="sex"
        value="f"
        required={sex === ''}
        id="female"
        onChange={event => handleSelect(event, 'sex')}
      />
      <label htmlFor="female">female</label>

      <br />

      <select
        value={born}
        onChange={event => handleSelect(event, 'born')}
        className="new-person__year"
        required
      >
        <option value="">born</option>
        {availableYears.map(year => (
          <option value={year} key={year}>{year}</option>
        ))}
      </select>

      <select
        value={died}
        onChange={event => handleSelect(event, 'died')}
        className="new-person__year"
        required
      >
        <option value="">died</option>
        {born && availableYears
          .filter(yearOfDeath => yearOfDeath >= Number(born)
            && yearOfDeath <= Number(born) + 149)
          .map(year => (
            <option value={year} key={year}>{year}</option>
          ))}
        {date.getFullYear() - born < 150
        && (<option value={Infinity}>alive</option>)}
      </select>

      <br />

      <select
        value={mother}
        onChange={event => handleSelect(event, 'mother')}
        className="new-person__parent"
        required
      >
        <option value="">Choose mother</option>
        {born
        && currentPeople
          .filter(person => person.sex === 'f' && person.died >= born
            && person.born <= born - 16)
          .map(woman => woman.name)
          .map(currentWoman => (
            <option
              value={currentWoman}
              key={currentWoman}
            >
              {currentWoman}
            </option>
          ))}
      </select>

      <select
        value={father}
        onChange={event => handleSelect(event, 'father')}
        className="new-person__parent"
        required
      >
        <option value="">Choose father</option>
        {born
        && currentPeople
          .filter(person => person.sex === 'm' && person.died >= born
            && person.born <= born - 16)
          .map(man => man.name)
          .map(currentMan => (
            <option value={currentMan} key={currentMan}>{currentMan}</option>
          ))}
      </select>

      <br />

      <button
        type="submit"
        className="new-person__submit"
      >
        Add Person
      </button>
    </form>

  );
};

NewPerson.propTypes = {
  currentPeople: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired,
    mother: PropTypes.string.isRequired,
    father: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      sex: PropTypes.string,
    })).isRequired,
  })).isRequired,
  addPerson: PropTypes.func.isRequired,
  updateChildren: PropTypes.func.isRequired,
  history: PropTypes.shape(
    { push: PropTypes.func },
  ).isRequired,
};

export default NewPerson;
