import React, { useState, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { PersonRow } from './PersonRow';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const columns = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];
  const sortingColumns = ['Born', 'Died', 'Name', 'Sex'];
  const [data, setData] = useState<Person[]>([]);
  const history = useHistory();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const sortBy: string = params.get('sortBy') || '';
  const sortOrder: string = params.get('sortOrder') || '';

  useMemo(() => {
    const sortFunc = (a: Person, b: Person) => {
      switch (sortBy) {
        case 'Sex':
          return sortOrder === 'asc' ? a?.sex?.localeCompare(b?.sex) : b?.sex?.localeCompare(a?.sex);
        case 'Born':
          return sortOrder === 'asc' ? +a?.born - +b?.born : +b?.born - +a?.born;
        case 'Died':
          return sortOrder === 'asc' ? +b?.died - +a?.died : a?.died - +b?.died;
        case 'Name':
          return sortOrder === 'asc' ? a?.name?.localeCompare(b?.name) : b?.name?.localeCompare(a?.name);
        default:
          return 0;
      }
    };

    if (sortBy !== '') {
      people.sort(sortFunc);
    }

    setData(people);
  }, [people, sortOrder, sortBy]);

  return (
    <table className="table">
      <thead className="">
        <tr>
          {columns.map(item => (
            <th
              key={item}
              onClick={() => {
                if (sortingColumns.includes(item)) {
                  params.set('sortBy', item);
                  params.set('sortOrder', sortOrder === 'asc' ? 'desc' : 'asc');

                  history.push({
                    search: params.toString(),
                  });
                }
              }}
            >
              {item}
              {sortBy === item && (
                <span>*</span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data
        && (data.map((person) => (
          <PersonRow key={person.slug} person={person} />
        )))}
      </tbody>
    </table>
  );
};
