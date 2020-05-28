import React from 'react';
import './TableHeaderRow.css';

type Props = {
  headers: string[];
}

const TableHeaderRow:React.FC<Props> = ({ headers }) => (
  <tr className="people-table__header">
    {headers.map((header: string) => (
      <td className="people-table__header-name" key={header}>{header}</td>
    ))}
  </tr>
)

export default TableHeaderRow;
