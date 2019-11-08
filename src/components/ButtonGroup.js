import React from 'react';
import { Button } from 'semantic-ui-react';

const ButtonGroup = (props) => {
  const {
    byName,
    byId,
    bySex,
    byBorn,
    byDied,
    byAge,
    byCentury,
  } = props;

  return (
    <Button.Group>
      <Button
        basic
        size="big"
        color="red"
        onClick={byName}
      >
Sort by name
      </Button>
      <Button
        basic
        size="big"
        color="orange"
        onClick={byId}
      >
Sort by id
      </Button>
      <Button
        basic
        size="big"
        color="yellow"
        onClick={bySex}
      >
Sort by sex
      </Button>
      <Button
        basic
        size="big"
        color="olive"
        onClick={byBorn}
      >
Sort by born
      </Button>
      <Button
        basic
        size="big"
        color="green"
        onClick={byDied}
      >
Sort by died
      </Button>
      <Button
        basic
        size="big"
        color="teal"
        onClick={byAge}
      >
Sort by age
      </Button>
      <Button
        basic
        size="big"
        color="blue"
        onClick={byCentury}
      >
Sort by century
      </Button>
    </Button.Group>
  );
};

export default ButtonGroup;
