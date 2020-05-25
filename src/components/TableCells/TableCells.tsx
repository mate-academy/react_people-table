import React from 'react';
import cn from 'classnames';
import './TableCells.scss';
import { Table } from 'semantic-ui-react';

type Props = {
  person: Person;
  tableHeaders: TableHeader[];
  onSelect: (field: string, person: Person) => void;
};

const TableCells: React.FC<Props> = ({ person, tableHeaders, onSelect }) => (
  <>
    {tableHeaders.map(({ code }) => (
      <Table.Cell
        className={cn('TableCells', {
          TableCells_centenarians: person[code] >= 65 && code === 'age',
          TableCells_aborigine: person.born <= 1650 && code === 'name',
        })}
        key={code}
        content={person[code]}
        onClick={() => onSelect(code, person)}
      />
    ))}
  </>
);

export default TableCells;
