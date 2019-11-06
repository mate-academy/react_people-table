import React from 'react';

class NewPerson extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      bornyear: '',
      deathyear: '',
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
    const { name, bornyear, deathyear, mother, father, sex } = this.state;
    if (name === '' || bornyear === '' || deathyear === '' || sex === '') {
      alert('Please complete all inputs!')
      return;
    }
    const bornOnlyear = new Date(bornyear).getFullYear() || '';
    const deathOnlyear = new Date(deathyear).getFullYear() || '';
    const age = deathOnlyear - bornOnlyear;
    if (age <= 0 || age >= 150) {
      alert('Please write correct born and died dades')
      return;
    }
    const century = Math.ceil(deathOnlyear / 100);

    const person = {
      name: name,
      born: bornOnlyear,
      died: deathOnlyear,
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
      bornyear: '',
      deathyear: '',
      mother: '',
      father: '',
      sex: '',
    })
  }

  render() {

    return (
      <div className="new-person">
        <form className='new-person-form' onSubmit={this.addNewPerson}>
          <label>
            Full name:<br />
            <input type="text" name="name" className="form-input" value={this.state.name} onChange={this.changeFormData} />
          </label>
          <div className="form-little-container">
            <label>
                Born year:<br />
                <input type="date" value={this.state.bornyear} name="bornyear" onChange={this.changeFormData} />
              </label>
              <label>
                Death year:<br />
                <input type="date" value={this.state.deathyear} name="deathyear" onChange={this.changeFormData} />
              </label>
          </div>
            <label>
            Mother:<br />
            <input type="text" name="mother" value={this.state.mother} onChange={this.changeFormData} />
          </label>
          <label>
            Father:<br />
            <input type="text" name="father" value={this.state.father} onChange={this.changeFormData} />
          </label>
          <labe style={{ display: 'flex' }}>
            <p><input type="radio" name="sex" value="male" onChange={this.changeFormData} />Male</p>
            <p><input type="radio" name="sex" value="female" onChange={this.changeFormData} />Female</p>
          </labe>
          <button>Send</button>
        </form>
      </div>
    )
  }
}

export default NewPerson;
