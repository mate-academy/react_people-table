import React from 'react';
import { Form } from 'semantic-ui-react';

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

class NewPerson extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {

    return (
      <form>

      </form>
    )
  }
}

export default NewPerson;
