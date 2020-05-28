import React from 'react';
import {PersonRow} from './PersonRow';
import {useHistory, useLocation} from "react-router-dom";

interface Props {
  people: Person[];
}

const columnsName = ['NAME', 'SEX', 'BORN', 'DIED', 'MOTHER', 'FATHER'];

export const PeopleTable: React.FC<Props> = React.memo(({people}) => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';
  const isSortedAsc = searchParams.get('sortOrder') !== 'desc';


  const getPeople = (people: Person[], sortBy: string, sortedAsc: boolean ) => {
    switch (sortBy) {
      case 'name':
      case 'sex':
        return  (sortedAsc)
        ?[...people].sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
          :[...people].sort((a, b) => a[sortBy].localeCompare(b[sortBy])).reverse();

      case 'died':
      case 'born':
        return  (sortedAsc)
          ?[...people].sort((a, b) => a[sortBy] - b[sortBy])
          :[...people].sort((a, b) => a[sortBy] - b[sortBy]).reverse();

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
                  history.push({search: searchParams.toString()});
                }}>

                {columns}
                {'    '}


                    {sortBy === columns.toLowerCase() && (
                      isSortedAsc
                        ? (
                          <img
                            onClick={() => {
                              if (searchParams.get('sortBy') === columns.toLowerCase()){
                              searchParams.set('sortOrder', isSortedAsc ? 'desc' : 'asc');
                              history.push({search: searchParams.toString()});}
                              else{searchParams.set('sortOrder', 'asc');
                                searchParams.set('sortBy', columns.toLowerCase());
                                history.push({search: searchParams.toString()});}
                            }}
                            src='https://image.flaticon.com/icons/svg/25/25330.svg'
                            width="16"
                            height="16"
                            alt='sort'
                            className="sort-img"
                          />
                        )
                        :(
                          <img
                            onClick={() => {
                              searchParams.set('sortOrder', isSortedAsc ? 'desc' : 'asc');
                              searchParams.set('sortBy', columns.toLowerCase());
                              history.push({search: searchParams.toString()});
                            }}
                            src='https://image.flaticon.com/icons/svg/25/25224.svg'
                            width="16"
                            height="16"
                            alt='sort'
                            className="sort-img"
                          />
                        )
                    )}



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
      {getPeople(people, sortBy, isSortedAsc).map(person => <PersonRow
        person={person}
      />)}
      </tbody>
    </table>


  )
})


