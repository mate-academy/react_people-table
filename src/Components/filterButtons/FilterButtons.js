import React from 'react';
import {Button} from "semantic-ui-react";

const FilterButtons = ({changeSortValue}) => {
  return (
    <div className="wrapper">
      <Button onClick={changeSortValue}>id</Button>
      <Button onClick={changeSortValue}>name</Button>
      <Button onClick={changeSortValue}>sex</Button>
      <Button onClick={changeSortValue}>age</Button>
      <Button onClick={changeSortValue}>born</Button>
      <Button onClick={changeSortValue}>century</Button>
    </div>
  );
};

export default FilterButtons;
