import React from 'react';
import PropTypes from 'prop-types';

import {
  Modal, Button, Form, Col,
} from 'react-bootstrap';

class NewPerson extends React.Component {
  constructor({ people, forID, ...props }) {
    super({ people, forID, ...props });

    this.state = {
      people,
      newPerson: {
        id: Number(''),
        name: '',
        sex: '',
        died: 0,
        born: 0,
        mother: '',
        father: '',
        age: 0,
        century: 0,
        children: '',
      },
      show: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { handleFormSubmit } = this.props;

    handleFormSubmit(this.state.newPerson);
    this.setState({
      show: false,
      newPerson: {
        id: Number(''),
        name: '',
        sex: '',
        died: 0,
        born: 0,
        mother: '',
        father: '',
        age: 0,
        century: 0,
        children: '',
      },
    });
  };

  handleChange = (event) => {
    const value = event.target.value.replace(/[^\w\d\s]/g, '');
    const { name } = event.target;
    const { newPerson } = this.state;

    this.setState(state => ({
      newPerson: {
        ...newPerson,
        [name]: name === 'born' || name === 'died' ? Number(value) : value,
        id: Number(this.props.forID.length + 1),
        age: newPerson.died - newPerson.born,
        century: Math.ceil(newPerson.died / 100),
        children: state.people
          .filter(
            child => child.father === newPerson.name
              || child.mother === newPerson.name
          )
          .map(child => child.name)
          .join(', '),
      },
    }));
  };

  handleShow = () => this.setState({ show: true });

  handleClose = () => this.setState({
    show: false,
    newPerson: {
      id: Number(''),
      name: '',
      sex: '',
      died: 0,
      born: 0,
      mother: '',
      father: '',
      age: 0,
      century: 0,
      children: '',
    },
  });

  render() {
    const {
      name, sex, born, died, mother, father,
    } = this.state.newPerson;

    return (
      <>
        <Button
          title="Click for adding new Person to the table"
          variant="outline-info text-monospace"
          onClick={this.handleShow}
        >
          ✚ Add person
        </Button>

        <form onSubmit={this.handleSubmit}>
          <Modal
            show={this.state.show}
            onHide={this.handleClose}
            onSubmit={this.handleSubmit}
          >
            <Modal.Header closeButton>
              <Modal.Title>✚ Add person</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder="Enter name"
                    onChange={this.handleChange}
                    name="name"
                    title="Name cannot be shorter than 2 characters"
                    maxLength="30"
                    isValid={name.length > 2}
                    isInvalid={name.length > 1 && name.length < 3}
                    value={name.replace(/[^\W\D\s]/g, '')}
                  />

                </Form.Group>

                <Form.Group title="Please, choose gender">
                  <label htmlFor="male-Radio">
                    <input
                      onChange={this.handleChange}
                      name="sex"
                      type="radio"
                      value="m"
                      id="male-Radio"
                    />
                    <span className="male-radio">♂ Male</span>
                  </label>
                  {' / '}
                  <label htmlFor="female-Radio">
                    <input
                      onChange={this.handleChange}
                      name="sex"
                      type="radio"
                      value="f"
                      id="female-Radio"
                    />
                    <span className="female-radio">♀ Female</span>
                  </label>
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Born</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      placeholder="Date of birth"
                      value={this.state.born}
                      name="born"
                      maxLength="4"
                      title="Date of birth must be after 1500"
                      isValid={born > 1500 && born < 2019 && born < died}
                    />
                    {born >= died ? (
                      <span style={{ color: 'red', fontSize: '12px' }}>
                        Date of birth must be &gt; Date of death
                      </span>
                    ) : (
                      ''
                    )}
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Died</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      placeholder="Date of death"
                      value={this.state.died}
                      name="died"
                      maxLength="4"
                      title="Date of death can not be earlier
                        than the date of birth"
                      isValid={
                        died > 1500
                        && died < 2019
                        && died > born
                        && died - born <= 150
                      }
                    />
                    {died - born > 150 ? (
                      <span style={{ color: 'red', fontSize: '12px' }}>
                        150 year old it&apos;s too much...
                      </span>
                    ) : (
                      ''
                    )}
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Mother</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={this.handleChange}
                      name="mother"
                    >
                      <option value="none">choose a mother</option>
                      {this.state.people.map(person => (
                        <option value={person.mother} key={person.id}>
                          {person.mother}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Father</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={this.handleChange}
                      name="father"
                    >
                      <option value="none">choose a father</option>
                      {this.state.people.map(person => (
                        <option value={person.father} key={person.id}>
                          {person.father}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="danger" onClick={this.handleClose}>
                Close
              </Button>
              <Button
                variant={
                  name.length < 3
                  || born < 1500
                  || born > 2019
                  || died < 1500
                  || died > 2019
                  || died === born
                  || sex.length < 1
                  || mother.length < 1
                  || father.length < 1
                  || died < born
                    ? 'active'
                    : 'info'
                }
                type="submit"
                title="Add this person to the table"
                onClick={this.handleSubmit}
                disabled={
                  name.length < 3
                  || born < 1500
                  || born > 2019
                  || died < 1500
                  || died > 2019
                  || died === born
                  || born >= died
                  || died - born > 150
                  || sex.length < 1
                  || mother.length < 1
                  || father.length < 1
                }
              >
                ✚ Add person
              </Button>
            </Modal.Footer>
          </Modal>
        </form>
      </>
    );
  }
}

NewPerson.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired,
    century: PropTypes.number.isRequired,
    mother: PropTypes.string,
    father: PropTypes.string,
    children: PropTypes.string,
  })).isRequired,
  forID: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired,
    century: PropTypes.number.isRequired,
    mother: PropTypes.string,
    father: PropTypes.string,
    children: PropTypes.string,
  })).isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
};
export default NewPerson;
