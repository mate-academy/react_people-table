import React from 'react';
import { Button } from 'semantic-ui-react';

function Load({ showList }) {
  return (
    <Button
      size="massive"
      onClick={showList}
      primary
      basic
    >
      Load data
    </Button>
  );
}

export default Load;
