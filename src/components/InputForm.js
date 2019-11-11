import React from 'react';
import { Input } from 'semantic-ui-react';

const InputForm = ({ filtering }) => {
  const inputChanged = (event) => {
    filtering(event.target.value);
  };

  return (
    <Input
      onChange={inputChanged}
      id="form-input-control"
      fluid
      icon="search"
      placeholder="Search..."
    />
  );
};

export default InputForm;
