import React from 'react';

class NewPerson extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      born: '',
      death: '',
      mother: '',
      father: '',
      sex: '',
    }
  }

  changeFormData = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (name === 'name' || name === 'mother' || name === 'father') {
      this.setState({ [name]: value.match(/[A-Za-zа-яА-Я ]*/).join('') })
    } else {
      this.setState({ [name]: value })
    }
  }

  addNewPerson = (event) => {
    event.preventDefault();
    const { addNewUser } = this.props;
    const { name, born, death, mother, father, sex } = this.state;
    console.log(this.state)
    if (name === '' || born === '' || death === '' || sex === '') {
      alert('Please complete all inputs!')
      return;
    }
    const bornYear = new Date(born).getFullYear() || '';
    const deathYear = new Date(death).getFullYear() || '';
    const age = deathYear - bornYear;
    if (age <= 0 || age >= 150) {
      alert('Please write correct born and died dades')
      return;
    }
    const century = Math.ceil(deathYear / 100);

    const person = {
      name: name,
      born: bornYear,
      died: deathYear,
      mother: mother,
      father: father,
      sex: sex,
      children: [],
      age: age,
      century: century,
    }

    addNewUser(person);
    this.setState({
      name: '',
      born: '',
      death: '',
      mother: '',
      father: '',
      sex: '',
    })
  }

  render() {
    const { name, mother, father } = this. state;

    return (
      <div className="new-person">
        <form className='new-person-form' onSubmit={this.addNewPerson}>
          <label>
            Full name:<br />
            <input type="text" name="name" className="form-input" value={name} onChange={this.changeFormData} required />
          </label>
          <div className="form-little-container">
            <label>
                Born year:<br />
                <input type="date" name="born" onChange={this.changeFormData} required />
              </label>
              <label>
                Death year:<br />
                <input type="date" name="death" onChange={this.changeFormData} required />
              </label>
          </div>
            <label>
            Mother:<br />
            <input type="text" name="mother" value={mother} onChange={this.changeFormData} />
          </label>
          <label>
            Father:<br />
            <input type="text" name="father" value={father} onChange={this.changeFormData} />
          </label>
          <labe style={{ display: 'flex' }}>
            <p><input type="radio" name="sex" value="male" onChange={this.changeFormData} required />Male</p>
            <p><input type="radio" name="sex" value="female" onChange={this.changeFormData} required />Female</p>
          </labe>
          <button>Send</button>
        </form>
      </div>
    )
  }
}

export default NewPerson;
