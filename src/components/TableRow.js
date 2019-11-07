import React from 'react';
import { Table } from 'semantic-ui-react';
import '../app.css';
import classNames from 'classnames';

function TableRow({
  person, index, selector, props,
}) {
  const classSex = (person.sex === 'm' ? 'Person--male' : 'Person--female');
  const classBorn = (+(person.born) <= 1650 ? 'classAge' : '');
  const classAge = (person.age >= 65 && 'age');

  return (
    <Table.Row
      className={classNames('Person',
        person.selected && 'Person--selected',
        `Person--lived-in-${person.century}`)}
      active={props.selected === index}
      onClick={() => selector(index)}
    >
      <Table.Cell>{person.id}</Table.Cell>
      <Table.Cell className={classBorn}>{person.name}</Table.Cell>
      <Table.Cell className={classSex}>{person.sex}</Table.Cell>
      <Table.Cell>{person.born}</Table.Cell>
      <Table.Cell>{person.died}</Table.Cell>
      <Table.Cell className={classAge}>{person.age}</Table.Cell>
      <Table.Cell>{person.century}</Table.Cell>
      <Table.Cell>{person.mother}</Table.Cell>
      <Table.Cell>{person.father}</Table.Cell>
    </Table.Row>
  );
}

export default TableRow;
