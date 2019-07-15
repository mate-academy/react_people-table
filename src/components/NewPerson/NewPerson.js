/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newPersonPropTypes } from '../propTypes';
import { finishAdding } from '../redux/newPerson';
import { addUser } from '../redux/users';
import { addUserToShows } from '../redux/usersToShow';

import './NewPerson.css';

class NewPerson extends Component {
  state = {
    name: '',
    sex: 'f',
    born: 0,
    died: 0,
    mother: 'None',
    father: 'None',
    errorNameField: '',
    errorAgeField: '',
    motherList: [],
    fatherList: [],
  };

  handleChange = ({ target }) => {
    const { value, name: key } = target;

    if (key === 'born') {
      const { users } = this.props;
      return this.setState({
        [key]: value.trim(),
        motherList: users
          .filter(user => (user.born < value && user.sex === 'f'))
          .map(user => <option value={user.name}>{user.name}</option>),
        fatherList: users
          .filter(user => (user.born < value && user.sex === 'm'))
          .map(user => <option value={user.name}>{user.name}</option>),
      });
    }

    return this.setState({ [key]: value.trim() });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      name, sex, born, died, mother, father,
    } = this.state;
    const {
      addUser, addUserToShows, finishAdding, users,
    } = this.props;

    let isDataValid = true;

    const pattern = /[^a-z\s]/gi;
    let errorNameField = '';
    if (pattern.test(name)) {
      errorNameField = 'Name must contain only letters and spaces';
      isDataValid = false;
    }

    const age = died - born;
    let errorAgeField = '';
    if (age > 150 || age < 1) {
      errorAgeField = 'Age must be more than 0 and less than 150';
      isDataValid = false;
    }

    this.setState({ errorNameField, errorAgeField });

    if (isDataValid) {
      const user = {
        id: users.length + 1,
        name,
        sex,
        born,
        died,
        age,
        century: Math.ceil(died / 100),
        mother,
        father,
        children: [],
      };

      addUser(user);
      addUserToShows(user);
      finishAdding();
    }
  };

  render() {
    const { finishAdding } = this.props;
    const { handleChange, handleSubmit } = this;
    const {
      errorNameField,
      errorAgeField,
      born,
      mother,
      father,
      motherList,
      fatherList,
    } = this.state;

    return (
      <section>
        <div className="backdrop" />
        <div className="modal">
          <h2 className="modal__header">Adding a new user</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              <div className="mt">Name</div>
              <input
                className="modal__input mt"
                id="name-field"
                name="name"
                type="text"
                placeholder="Type a name"
                onChange={handleChange}
                required
              />
              {errorNameField && (
                <div className="error-message">{errorNameField}</div>
              )}
            </label>
            <div className="mt">
              <label htmlFor="sex-field-f">
                <input
                  id="sex-field-f"
                  type="radio"
                  name="sex"
                  value="f"
                  onChange={handleChange}
                  defaultChecked
                />
                Female
              </label>
              <label htmlFor="sex-field-m">
                <input
                  id="sex-field-m"
                  type="radio"
                  name="sex"
                  value="m"
                  onChange={handleChange}
                />
                Male
              </label>
            </div>
            <label htmlFor="name">
              <div className="mt">Year of birth</div>
              <input
                className="modal__input mt"
                name="born"
                id="born-field"
                type="number"
                placeholder="Only number available"
                onChange={handleChange}
                required
              />
            </label>
            <label htmlFor="name">
              <div className="mt">Year of death</div>
              <input
                className="modal__input mt"
                name="died"
                id="died-field"
                type="number"
                placeholder="Only number available"
                onChange={handleChange}
                required
              />
              {errorAgeField && (
                <div className="error-message">{errorAgeField}</div>
              )}
            </label>
            <div className="mt">Choose a mother</div>
            <select
              name="mother"
              className="modal__select"
              defaultValue={mother}
              onChange={handleChange}
            >
              <option value="none" selected>
                None
              </option>
              {born && motherList}
            </select>
            <div className="mt">Choose a father</div>
            <select
              name="father"
              className="modal__select"
              defaultValue={father}
              onChange={handleChange}
            >
              <option value="none" selected>
                None
              </option>
              {born && fatherList}
            </select>
            <div className="modal__actions">
              <button type="submit" className="modal__button">
                Add
              </button>
              <button
                type="button"
                className="modal__button"
                onClick={finishAdding}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

NewPerson.propTypes = newPersonPropTypes;

const mapState = ({ users }) => ({ users });

const mapDispatch2 = {
  finishAdding,
  addUser,
  addUserToShows,
};

export default connect(
  mapState,
  mapDispatch2
)(NewPerson);
