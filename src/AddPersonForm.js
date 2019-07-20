import React from 'react';
import PropTypes from 'prop-types';

class AddPersonForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPersonName: '',
      newPersonSex: '',
      newPersonBorn: null,
      newPersonDied: null,
      newPersonFatherName: '',
      newPersonMotherName: '',
      newPersonChildren: '',
    };
  }

  handleFormFieldChange = (event) => {
    let { name, value } = event.target;

    switch (name) {
      case 'newPersonBorn':
      case 'newPersonDied':
        value = value.replace(/^\d-/g, '');
        break;
      case 'newPersonSex':
        value = value.replace(/^[^mf]/, '');
        break;
      case 'newPersonChildren':
        value = value.replace(/[^\wА-Яа-яЁё ,.-]/g, '');
        break;
      default: value = value.replace(/[^\wА-Яа-яЁё .-]/g, '');
    }

    this.setState(
      { [name]: value }
    );
  }

  render() {
    return (
      <form>
        <fieldset>
          <legend>New Person Add Form</legend>
          <div>
            <label>
              Name:
              <input
                type="text"
                placeholder="New person's name"
                name="newPersonName"
                value={this.state.newPersonName}
                onChange={this.handleFormFieldChange}
                required
              />
            </label>

            <label>Gender: </label>
            <label>
              <input
                type="radio"
                value="m"
                name="newPersonSex"
                onChange={this.handleFormFieldChange}
                required
              />
              -Male
            </label>

            <label>
              <input
                type="radio"
                value="f"
                name="newPersonSex"
                onChange={this.handleFormFieldChange}
                required
              />
              -Female
            </label>
          </div>

          <div>
            <label>
              Year of born:
              <input
                type="number"
                value={this.newPersonBorn}
                name="newPersonBorn"
                onChange={this.handleFormFieldChange}
                required
              />
            </label>

            <label>
              Year of death:
              <input
                type="number"
                value={this.newPersonDied}
                name="newPersonDied"
                onChange={this.handleFormFieldChange}
              />
            </label>
          </div>

          <div>
            <label>
              Father:
              <input
                type="text"
                placeholder="Person's father's name"
                value={this.newPersonFatherName}
                name="newPersonFatherName"
                onChange={this.handleFormFieldChange}
              />
            </label>

            <label>
              Mother:
              <input
                type="text"
                placeholder="Person's mother's name"
                value={this.newPersonMotherName}
                name="newPersonMotherName"
                onChange={this.handleFormFieldChange}
              />
            </label>

            <label>
              Children:
              <input
                type="text"
                placeholder="Coma separated nmes"
                value={this.newPersonChildren}
                name="newPersonChildren"
                onChange={this.handleFormFieldChange}
              />
            </label>
          </div>
          <button onClick={(event) => {
            event.preventDefault();

            return this.props.addPersonHandler(
              this.state.newPersonName,
              this.state.newPersonSex,
              +this.state.newPersonBorn,
              +this.state.newPersonDied,
              this.state.newPersonFatherName,
              this.state.newPersonMotherName,
              this.state.newPersonChildren
            );
          }}>
            Submit
          </button>
        </fieldset>
      </form>
    );
  }
}

AddPersonForm.propTypes = {
  addPersonHandler: PropTypes.func,
};

export default AddPersonForm;
