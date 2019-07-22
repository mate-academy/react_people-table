import React from 'react';

class CreatePerson extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.people.length + 1,
      name: '',
      born: '',
      died: '',
      sex: 'f',
      mother: '',
      father: '',
      children: [],
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state);
    this.setState({
      id: '',
      name: '',
      born: '',
      died: '',
      sex: 'f',
      mother: '',
      father: '',
      children: [],
    });
  }

  render() {
    const { people } = this.props;
    const { mother, father } = this.state;

    return (
      <div className="form">
        <from>
          <input
            type="text"
            value={this.state.name}
            placeholder="Enter your name"
            onChange={this.handleChange}
            name="name"
          />
          <input
            type="number"
            placeholder="Enter only year of born"
            onChange={this.handleChange}
            name="born"
          />
          <input
            type="number"
            placeholder="Enter only year of died"
            onChange={this.handleChange}
            name="died"
            max="4"
          />
          <select
            id="form-select"
            className="form-field_input"
            name="mother"
            value={mother}
            onChange={this.handleChange}
          >
            <option value="">Select mother</option>
            {people.map(personMother => (
              <option
                value={personMother.mother}
                key={personMother.mother}
              >
                {personMother.mother}
              </option>
            ))}
          </select>

          <select
            id="form-select"
            className="form-field_input"
            name="father"
            value={father}
            onChange={this.handleChange}
          >
            <option value="">Select father</option>
            {people.map(personFather => (
              <option
                value={personFather.father}
                key={personFather.father}
              >
                {personFather.father}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => this.props.onSubmit(this.state)}
          >
Submit
          </button>
        </from>
      </div>
    );
  }
}

export default CreatePerson;
