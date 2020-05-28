import React from 'react';
// import memoize from 'memoize-one';
// import cn from 'classnames';
import { Icon, Pagination, Table, Dropdown } from 'semantic-ui-react';
import './Paginator.scss';

const options = [
  { key: 1, text: '5 people', value: 5 },
  { key: 2, text: '10 people', value: 10 },
  { key: 3, text: '20 people', value: 20 },
  { key: 4, text: '50 people', value: 50 },
];

type Props = {
  page: number;
  perPage: number;
  totalPages: number;
  onSelectPage: (_: React.SyntheticEvent, data: object) => void;
  onSelectPerPage: (_: React.SyntheticEvent, data: object) => void;
};

const Paginator: React.FC<Props> = ({
  page,
  perPage,
  totalPages,
  onSelectPage,
  onSelectPerPage,
}) => {
  console.log('render');
  return (
    <Table.HeaderCell colSpan="10" className="Pagination">
      <Dropdown
        placeholder="Select people per page"
        floated="left"
        selection
        name="perPage"
        value={perPage}
        onChange={onSelectPerPage}
        options={options}
        wrapSelection={false}
        simple
      />
      <Pagination
        floated="right"
        activePage={page}
        onPageChange={onSelectPage}
        ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
        prevItem={{
          content: <Icon name="angle left" />,
          disabled: page === 1,
          icon: true,
        }}
        firstItem={{
          content: <Icon name="angle double left" />,
          disabled: page === 1,
          icon: true,
        }}
        nextItem={{
          content: <Icon name="angle right" />,
          disabled: page === totalPages,
          icon: true,
        }}
        lastItem={{
          content: <Icon name="angle double right" />,
          disabled: page === totalPages,
          icon: true,
        }}
        totalPages={totalPages}
      />
    </Table.HeaderCell>
  );
};

export default Paginator;
