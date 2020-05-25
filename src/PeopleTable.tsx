import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  useHistory,
  useParams,
} from 'react-router-dom';
import cn from 'classnames';
import { Person } from './Person';

type Props = {
  people: PeopleTable[];
  searchParams: any;
};

export const PeopleTable: React.FC<Props> = ({ people, searchParams }) => {
  const tableHead = ['id', 'name', 'sex', 'born', 'died', 'age', 'father', 'mother', 'century'];
  const history = useHistory();
  const { name } = useParams();
  const sortBy = searchParams.get('sortBy');
  const sortOrder = searchParams.get('sortOrder');
  const [sortedPeople, setSortedPeople] = useState<PeopleTable[]>([...people]);

  useEffect(() => {
    setSortedPeople([...people]);
  }, [people]);

  useMemo(() => {
    switch (sortBy) {
      case 'id':
      case 'died':
      case 'born':
      case 'age':
      case 'century':
        sortedPeople.sort((a: any, b: any) => (b[sortBy] - a[sortBy]));
        break;
      case 'name':
      case 'sex':
      case 'father':
      case 'mother':
        sortedPeople.sort((a: any, b: any) => (a[sortBy].localeCompare(b[sortBy])));
        break;
      default:
        break;
    }
  }, [sortedPeople, sortBy]);

  useMemo(() => {
    switch (sortOrder) {
      case 'desc':
        sortedPeople.reverse();
        break;
      default:
      //   break;
    }
  }, [sortedPeople, sortOrder]);

  const clickHandler = (table: string) => {
    if (searchParams.get('sortBy') === table && searchParams.get('sortOrder') === 'asc') {
      searchParams.set('sortOrder', 'desc');
    } else {
      searchParams.set('sortOrder', 'asc');
    }

    searchParams.set('sortBy', table.toLowerCase());

    history.push({
      search: searchParams.toString(),
    });
  };

  const handleChangePath = (e: any) => {
    history.push({
      pathname: `/people/${e}`,
    });
  };

  return (
    <>
      <table className="PeopleTable">
        <thead>
          <tr
            className="PeopleTable-head"
          >
            {
              tableHead.map(table => (
                <th
                  onClick={() => clickHandler(table)}
                  key={table}
                  className="PeopleTable--tabs"
                >
                  {table.toUpperCase()}
                  {sortBy === table && '*'}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {sortedPeople.map((person) => (
            <tr
              key={person.id}
              className={cn('Person', {
                'Person--active': person.slug === name,
              })}
              onClick={() => handleChangePath(person.slug)}
            >
              <Person person={person} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
