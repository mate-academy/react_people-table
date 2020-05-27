import React from 'react';
// import cn from 'classnames';
import { Icon, Pagination, Table } from 'semantic-ui-react';
import './Paginator.scss';

type Props = {
  page: number;
  // perPage: number;
  totalPages: number;
  onSelectPage: (_: React.SyntheticEvent, { activePage }: any) => void;
};

const Paginator: React.FC<Props> = ({
  page,
  totalPages,
  onSelectPage,
}) => {
  return (
    <Table.HeaderCell colSpan="10" className="Pagination">
      <Pagination
        defaultActivePage={page}
        onPageChange={onSelectPage}
        ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
        firstItem={{ content: <Icon name="angle double left" />, icon: true }}
        lastItem={{ content: <Icon name="angle double right" />, icon: true }}
        prevItem={{ content: <Icon name="angle left" />, icon: true }}
        nextItem={{ content: <Icon name="angle right" />, icon: true }}
        totalPages={totalPages}
      />
    </Table.HeaderCell>
  );
};

export default Paginator;
