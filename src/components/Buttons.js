import React from 'react';

import { Button } from 'semantic-ui-react';

function SortingButtons({ sorter }) {
  return (
    <>
      <Button onClick={() => sorter('Name')} color="blue">Name</Button>
      <Button onClick={() => sorter('Mother')} color="blue">Mother</Button>
      <Button onClick={() => sorter('Father')} color="blue">Father</Button>
      <Button onClick={() => sorter('Id')}>Id</Button>
      <Button onClick={() => sorter('Sex')}>Sex</Button>
      <Button onClick={() => sorter('Born')}>Born</Button>
      <Button onClick={() => sorter('Died')}>Died</Button>
      <Button onClick={() => sorter('Age')}>Age</Button>
      <Button onClick={() => sorter('Century')}>Century</Button>
    </>
  );
}

export default SortingButtons;
