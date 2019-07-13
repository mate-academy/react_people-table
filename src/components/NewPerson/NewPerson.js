import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './NewPerson.css';

class NewPerson extends Component {
  state = {
    name: '',
    sex: 'f',
    born: 0,
    died: 0,
    mother: 'None',
    father: 'None',
    errorName: '',
    errorAge: '',
  };

  handleChange = ({ target }) => {
    const { value, name: key } = target;
    this.setState({ [key]: value.trim() });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      name,
      sex,
      born,
      died,
      mother,
      father,
    } = this.state;
    const { addNewPerson, handleClose, users } = this.props;

    let isDataValid = true;

    const pattern = /[^a-z\s]/gi;
    let errorName = '';
    if (pattern.test(name)) {
      errorName = 'Name must contain only letters and spaces';
      isDataValid = false;
    }

    const age = died - born;
    let errorAge = '';
    if (age > 150 || age < 1) {
      errorAge = 'Age must be more than 0 and less than 150';
      isDataValid = false;
    }

    this.setState({ errorName, errorAge });

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

      addNewPerson(user);
      handleClose();
    }
  };

  render() {
    const { handleClose, users } = this.props;
    const { handleChange, handleSubmit } = this;
    const {
      errorName,
      errorAge,
      born,
      mother,
      father,
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
              {errorName && <div className="error-message">{errorName}</div>}
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
              {errorAge && <div className="error-message">{errorAge}</div>}
            </label>
            <select
              name="mother"
              className="modal__select"
              defaultValue={mother}
              onChange={handleChange}
            >
              <option value="none" disabled selected>
                Chose a mother
              </option>
              {born && (
                users
                  .filter(user => (user.born < born && user.sex === 'f'))
                  .map(user => <option value={user.name}>{user.name}</option>)
              )}
            </select>
            <select
              name="father"
              className="modal__select"
              defaultValue={father}
              onChange={handleChange}
            >
              <option value="none" disabled selected>
                Chose a father
              </option>
              {born && (
                users
                  .filter(user => (user.born < born && user.sex === 'm'))
                  .map(user => <option value={user.name}>{user.name}</option>)
              )}
            </select>
            <div className="modal__actions">
              <button type="submit" className="modal__button">
                Add
              </button>
              <button
                type="button"
                className="modal__button"
                onClick={handleClose}
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

NewPerson.propTypes = {
  addNewPerson: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapState = ({ users }) => ({
  users,
});

const mapDispatch = dispatch => ({
  handleClose: () => dispatch({ type: 'TOGGLE_ADDING_NEW' }),
  addNewPerson: person => dispatch({ type: 'ADD_NEW_PERSON', person }),
});

export default connect(
  mapState,
  mapDispatch
)(NewPerson);
