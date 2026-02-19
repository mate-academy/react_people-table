import { PersonWithParents } from '../../types/Person';
import { PersonRow } from './PersonRow';
import './PeopleTable.scss';

type SortBy = 'name' | 'sex' | 'born' | 'died';
type SortOrder = 'asc' | 'desc';

type Props = {
  people: PersonWithParents[];
  selectedSlug: string | undefined;
  sortBy: string | null;
  sortOrder: string | null;
  onSort: (field: SortBy) => void;
};

const SORTABLE: SortBy[] = ['name', 'sex', 'born', 'died'];

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  sortBy,
  sortOrder,
  onSort,
}) => {
  const renderSortIcon = (field: SortBy) => {
    if (sortBy !== field) {
      return <img src="/react_people-table/images/sort_both.png" alt="sort" />;
    }

    return sortOrder === 'desc' ? (
      <img src="/react_people-table/images/sort_desc.png" alt="desc" />
    ) : (
      <img src="/react_people-table/images/sort_asc.png" alt="asc" />
    );
  };

  const isActive = (field: SortBy) => sortBy === field;

  return (
    <table className="PeopleTable table is-striped is-narrow is-fullwidth">
      <thead>
        <tr>
          <th
            className={isActive('name') ? 'is-active' : ''}
            onClick={() => onSort('name')}
            style={{ cursor: 'pointer' }}
          >
            name {renderSortIcon('name')}
          </th>

          <th
            className={isActive('sex') ? 'is-active' : ''}
            onClick={() => onSort('sex')}
            style={{ cursor: 'pointer' }}
          >
            sex {renderSortIcon('sex')}
          </th>

          <th
            className={isActive('born') ? 'is-active' : ''}
            onClick={() => onSort('born')}
            style={{ cursor: 'pointer' }}
          >
            born {renderSortIcon('born')}
          </th>

          <th
            className={isActive('died') ? 'is-active' : ''}
            onClick={() => onSort('died')}
            style={{ cursor: 'pointer' }}
          >
            died {renderSortIcon('died')}
          </th>

          <th>mother</th>
          <th>father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonRow
            key={person.slug}
            person={person}
            isSelected={selectedSlug === person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
