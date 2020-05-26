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
  // const sortOrder = searchParams.get('sortOrder');
  const [sortedPeople, setSortedPeople] = useState<PeopleTable[]>([...people]);

  useEffect(() => {
    setSortedPeople([...people]);
  }, [people]);


  console.log('dsf')

  useMemo(() => {
    switch (sortBy) {
      case 'id':
      case 'died':
      case 'born':
      case 'age':
      case 'century':
       sortedPeople.sort((a: any, b: any) => (a[sortBy] - b[sortBy]));
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


  const clickHandler = (table: string) => {
    if (searchParams.get('sortBy') === table
      && searchParams.get('sortOrder') === 'asc') {
      searchParams.set('sortOrder', 'desc');
      sortedPeople.reverse();
    } else {
      searchParams.set('sortOrder', 'asc');
      sortedPeople.reverse();
    }

    searchParams.set('sortBy', table.toLowerCase());

    history.push({
      search: searchParams.toString(),
    });
  };

  const handleChangePath = (e: string) => {
    history.push({
      pathname: `/people/${e}`,
      search: searchParams.toString(),
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
