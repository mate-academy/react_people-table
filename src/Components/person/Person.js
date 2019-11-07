import React from 'react';
import { Table } from 'semantic-ui-react';

const Person = (props) => {
  const { person: { id, name, sex, age, born, died, century, father, mother, children },
    selectPerson, selectedId } = props;
  return (
    <>
      <Table.Row
        active={selectedId === id}
        onClick={selectPerson} data-person-id={id}
      >
        <Table.Cell>{id}</Table.Cell>
        <Table.Cell
          className={born < 1650
            ? 'wasBornBefore1650'
            : null}
        >
          {name}
        </Table.Cell>
        <Table.Cell >
          {sex === 'm'
          ? <span>&#128102;&#127999;</span>
          : <span>&#128129;</span>}
        </Table.Cell>
        <Table.Cell
          className={age >= 65 ? 'ageMore65' : null}
        >
          {age}
        </Table.Cell>
        <Table.Cell>{born}</Table.Cell>
        <Table.Cell>{died}</Table.Cell>
        <Table.Cell>{century}</Table.Cell>
        <Table.Cell>{mother}</Table.Cell>
        <Table.Cell>{father}</Table.Cell>
        <Table.Cell>
          {children.map((child, index) => (
            children.length - 1 !== index ? `${child.name}, ` : child.name
          ))}
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default Person;
