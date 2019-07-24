import React from 'react';
import PropTypes from 'prop-types';

class NewPerson extends React.Component {
  state ={
    name: '',
    sex: '',
    born: '',
    died: '',
    mother: '',
    father: '',
    children: [],

    errorsMap: {
      name: '',
      born: '',
      age: '',
      sex: '',
    },
  };

  handleFormSubmit = (event) => {
    const { onSubmit, peopleAmmount } = this.props;

    const errorsMap = {};

    event.preventDefault();

    this.setState((prevState) => {
      const {
        died,
        born,
        name,
        sex,
        children,
        mother,
        father,
      } = prevState;

      const age = (died === ''
        ? 2019 - +born
        : +died - +born);

      if (!name) {
        errorsMap.name = 'Name is required';
      }

      if (!born) {
        errorsMap.born = 'Year of birth is required';
      }

      if (!sex) {
        errorsMap.sex = 'Please, choose your gender';
      }

      if (age < 0 || age > 150) {
        errorsMap.age = 'Invalid year of birth and/or year of death';
      }

      if (Object.keys(errorsMap).length > 0) {
        return { errorsMap };
      }

      onSubmit({
        id: peopleAmmount + 1,
        age: (died === ''
          ? 2019 - +born
          : +died - +born),
        name,
        sex,
        born: +born,
        died: (died === ''
          ? ''
          : +died),
        children,
        mother,
        father,
      });

      return {};
    });

    this.setState({
      name: '',
      sex: '',
      born: '',
      died: '',
      mother: '',
      father: '',
      children: [],
    });
  };

  handleFieldChange = (event) => {
    const {
      name, value, checked, type,
    } = event.target;

    if (type === 'checkbox') {
      this.setState({
        [name]: checked,
      });
    } else if (name === 'children') {
      this.setState({
        children: value.replace(/[^\w, ]/, '').split(', '),
      });
    } else {
      this.setState({
        [name]: value.replace(/[^\w ]/, ''),

        errorsMap: {
          name: '',
          born: '',
        },
      });
    }
  };

  render() {
    const { errorsMap } = this.state;

    return (
      <form
        className="add-person-form"
        onSubmit={this.handleFormSubmit}
      >
        <div>
          <label htmlFor="name-field">
            Person's name:

            <input
              className="add-person-form__field"
              id="name-field"
              type="text"
              name="name"
              placeholder="FirstName LastName"
              onChange={this.handleFieldChange}
            />
          </label>

          {errorsMap.name && (
            <div className="add-person-form__error">
              {errorsMap.name}
            </div>
          )}
        </div>

        <div className="add-person-form__sex-fields">
          <label htmlFor="male-sex">
            <input
              className="add-person-form__field add-person-form__sex-field"
              id="male-sex"
              type="radio"
              name="sex"
              value="m"
              onChange={this.handleFieldChange}
            />
            Male
          </label>

          <label htmlFor="female-sex">
            <input
              className="add-person-form__field add-person-form__sex-field"
              id="female-sex"
              type="radio"
              name="sex"
              value="f"
              onChange={this.handleFieldChange}
            />
            Female
          </label>

          {errorsMap.sex && (
            <div className="add-person-form__error">
              {errorsMap.sex}
            </div>
          )}
        </div>

        <div className="add-person-form__years-fields">
          <div>
            <label htmlFor="born-field">
              Year of birth:

              <input
                className="add-person-form__field add-person-form__years-field"
                id="born-field"
                type="number"
                name="born"
                min="0"
                placeholder={new Date().getFullYear()}
                onChange={this.handleFieldChange}
              />
            </label>

            {errorsMap.born && (
              <div className="add-person-form__error">
                {errorsMap.born}
              </div>
            )}
          </div>

          <label htmlFor="dead-field">
            Year of death:

            <input
              className="add-person-form__field add-person-form__years-field"
              id="dead-field"
              type="number"
              name="died"
              min="0"
              placeholder={new Date().getFullYear()}
              onChange={this.handleFieldChange}
            />
          </label>
        </div>

        {errorsMap.age && (
          <div className="add-person-form__error">
            {errorsMap.age}
          </div>
        )}

        <div>
          <label htmlFor="mother-field">
            Person mother's name:

            <input
              className="add-person-form__field"
              id="mother-field"
              type="text"
              name="mother"
              placeholder="FirstName LastName"
              onChange={this.handleFieldChange}
            />
          </label>
        </div>

        <div>
          <label htmlFor="father-field">
            Person father's name:

            <input
              className="add-person-form__field"
              id="father-field"
              type="text"
              name="father"
              placeholder="FirstName LastName"
              onChange={this.handleFieldChange}
            />
          </label>
        </div>

        <div>
          <label htmlFor="children-field">
            Person children's names:

            <input
              className="add-person-form__field"
              id="children-field"
              type="text"
              name="children"
              placeholder="Please, separate names by comma"
              onChange={this.handleFieldChange}
            />
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="add-person-form__btn"
          >
            Add
          </button>
        </div>
      </form>
    );
  }
}

NewPerson.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  peopleAmmount: PropTypes.number.isRequired,
};

export default NewPerson;
