/* eslint-disable react/jsx-one-expression-per-line */

import React, { Component } from 'react'
import './AddUserWindow.css'

class AddUserWindow extends Component {
  state = {
    name: '',
    gender: false,
    bornYear: 0,
    diedYear: 0,
    error: {
      'name': '',
      'age': '',
    },
    isValid: false,
  }

  validateInput = async(event, field) => {
    const { value } = event.target

    switch (field) {
      case 'name': {
        if (true) {
          this.setState({
            error: {
              name: 'Name must contain only letters and spaces.',
            }
          })
        } else {
          this.setState({
            error: {
              name: '',
            }
          })
        }
        break
      }

      default:
        return
    }
    await this.setState({ [field]: value.trim() })
    // console.log(this.state[field])
  }

  render() {
    const { handleSubmit, handleClose } = this.props
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
                type="text"
                placeholder="Type a name"
                onChange={event => this.validateInput(event, 'name')}
              />
            </label>
            <div className="mt">
              <input type="radio" name="sex" id="" /> Female
              <input type="radio" name="sex" id="" /> Male
            </div>
            <label htmlFor="name">
              <div className="mt">Year of birth</div>
              <input
                className="modal__input mt"
                name="born"
                id="born-field"
                type="number"
                placeholder="Only number available"
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
              />
            </label>
            <div className="modal__actions">
              <button
                type="submit"
                className="modal__button"
              >
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
    )
  }
}

export default AddUserWindow
