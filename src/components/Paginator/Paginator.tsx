import React from 'react';
import memoize from 'memoize-one';
// import cn from 'classnames';
import { Icon, Pagination, Table } from 'semantic-ui-react';
import './Paginator.scss';

type Props = {
  page: number;
  // perPage: number;
  totalPages: number;
  onSelectPage: (_: React.SyntheticEvent, data: object) => void;
};

const Paginator: React.FC<Props> = ({
  page,
  totalPages,
  onSelectPage,
}) => {
  const currentPage = memoize(() => page);

  return (
    <Table.HeaderCell colSpan="10" className="Pagination">
      <Pagination
        defaultActivePage={currentPage()}
        onPageChange={onSelectPage}
        ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
        prevItem={{ content: <Icon name="angle left" />, icon: true }}
        firstItem={{ content: <Icon name="angle double left" />, icon: true }}
        nextItem={{ content: <Icon name="angle right" />, icon: true }}
        lastItem={{ content: <Icon name="angle double right" />, icon: true }}
        totalPages={totalPages}
      />
    </Table.HeaderCell>
  );
};

export default Paginator;
