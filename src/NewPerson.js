import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

class NewPerson extends React.Component {
  state = {
    userMap: {
      name: '',
      sex: 'f',
      born: null,
      died: null,
      father: '',
      mother: '',
    },
    errorsMap: {
      died: '',
    },
  };

  handleFieldChange = (event) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      userMap: {
        ...prevState.userMap,
        [name]: (name === 'name') ? value.replace(/[^\w|\d]/, '') : value,
      },
      errorsMap: {
        ...prevState.errorsMap,
        [name]: '',
      },
    }));
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { userMap } = this.state;
    const { onSubmit } = this.props;

    if (
      ((userMap.died - userMap.born) < 0)
      || ((userMap.died - userMap.born) > 150)
    ) {
      this.setState(prevState => ({
        userMap: {
          ...prevState.userMap,
        },
        errorsMap: {
          ...prevState.errorsMap,
          died: 'Incorrect the year of born and/or the year of death.',
        },
      }));
    } else {
      onSubmit(userMap);
      this.setState(prevState => ({
        userMap: {
          ...prevState.userMap,
          name: '',
          sex: 'f',
          born: null,
          died: null,
          father: '',
          mother: '',
        },
      }));
    }
  }

  render() {
    const { closeForm } = this.props;
    const { userMap, errorsMap } = this.state;
    return (
      <div className="shown-form">
        <form
          className="form-wrap"
          onSubmit={this.handleFormSubmit}
        >
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            defaultValue={userMap.name}
            className="input"
            required="true"
            onChange={this.handleFieldChange}
          />
          <label
            htmlFor="new-person-sex__man"
            className="radio-btn"
          >
            <input
              id="new-person-sex__man"
              type="radio"
              value="m"
              name="sex"
              onChange={this.handleFieldChange}
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
              onChange={this.handleFieldChange}
            />
            Woman
          </label>
          <input
            type="text"
            placeholder="Enter the year of born"
            className="input"
            name="born"
            defaultValue={userMap.born}
            required="true"
            onChange={this.handleFieldChange}
          />
          <input
            type="text"
            placeholder="Enter the year of death"
            className="input"
            name="died"
            defaultValue={userMap.died}
            required="true"
            onChange={this.handleFieldChange}
          />
          {errorsMap.died && (
            <div className="error">{errorsMap.died}</div>
          )}
          <input
            type="text"
            placeholder="Enter father's name"
            className="input"
            name="father"
            defaultValue={userMap.father}
            required="true"
            onChange={this.handleFieldChange}
          />
          <input
            type="text"
            placeholder="Enter mother's name"
            className="input"
            name="mother"
            defaultValue={userMap.mother}
            required="true"
            onChange={this.handleFieldChange}
          />
          <button
            type="submit"
            className="btn-add"
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
  }
}

NewPerson.propTypes = {
  closeForm: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

NewPerson.defaultProps = {
  closeForm: () => {},
};

export default NewPerson;
