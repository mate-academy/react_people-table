import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

const TabCell = ({
  person: {
    id,
    name,
    sex,
    born,
    died,
    mother,
    father,
    age,
    century,
  },
}) => (
  <>
    <Table.Cell>{id}</Table.Cell>
    {
      (born < 1650)
        ? (
          <Table.Cell>
            {name}
            {' '}
            <Icon name="checkmark" />
          </Table.Cell>
        )
        : <Table.Cell>{name}</Table.Cell>
    }
    <Table.Cell>
      {
        (sex === 'f')
          ? <Icon name="venus" />
          : <Icon name="mars" />
      }
    </Table.Cell>
    <Table.Cell>{born}</Table.Cell>
    <Table.Cell>{died}</Table.Cell>
    {
      (age >= 65)
        ? <Table.Cell positive>{age}</Table.Cell>
        : <Table.Cell>{age}</Table.Cell>
    }
    <Table.Cell>{century}</Table.Cell>
    <Table.Cell>{mother || 'Unknown'}</Table.Cell>
    <Table.Cell>{father || 'Unknown'}</Table.Cell>
  </>
);

export default TabCell;
