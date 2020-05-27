import React from 'react';
import {PersonRow} from './PersonRow';
import {useHistory, useLocation} from "react-router-dom";

interface Props {
  people: Person[];
}

const columnsName = ['NAME', 'SEX', 'BORN', 'DIED', 'MOTHER', 'FATHER'];

export const PeopleTable: React.FC<Props> = ({people}) => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';


  const getPeople = (people: Person[], sortBy: string) => {
    switch (sortBy) {
      case 'name':
      case 'sex':
        return [...people].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

      case 'died':
      case 'born':
        return [...people].sort((a, b) => a[sortBy] - b[sortBy]);

      default:
        return people;
    }
  };

  return (
    <table className="PeopleTable">
      <thead className="PeopleTable-header">
      <tr>
        {columnsName.map(columns => {
          if (columns.toLowerCase() === 'name'
            || columns.toLowerCase() === 'born'
            || columns.toLowerCase() === 'died'
            || columns.toLowerCase() === 'sex') {
            return (
              <th
                key={columns}
                onClick={() => {
                  searchParams.set('sortBy', columns.toLowerCase());
                  history.push({
                    search: searchParams.toString(),
                  });
                }}
              >
                {columns}
                {sortBy === columns.toLowerCase() && '*'}
              </th>)

          } else {
            return (
              <th
                key={columns}

              >
                {columns}

              </th>)
          }
        })}
      </tr>
      </thead>
      <tbody>
      {getPeople(people, sortBy).map(person => <PersonRow
        person={person}
      />)}
      </tbody>
    </table>

  )
}


