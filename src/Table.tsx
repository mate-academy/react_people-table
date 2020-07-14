/* eslint-disable no-console */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from './interfaces';

interface Props {
  list: Person[];
  id: string;
  path: string;
}

export const Table: React.FC<Props> = ({ list, id, path }) => {
  console.log(id, path);

  return (
    <>
      <table className="table table-sm">
        <thead>
          <tr>
            {/* <th scope="col">#</th> */}
            <th scope="col">Name</th>
            <th scope="col">Sex</th>
            <th scope="col">Born</th>
            <th scope="col">Died</th>
            <th scope="col">Mother</th>
            <th scope="col">Father</th>
          </tr>
        </thead>
        <tbody>
          {
            list.map(person => (
              <tr>
                {/* <th scope="row">1</th> */}
                <td>
                  <NavLink className="navig" key={person.name} to={`${person.slug}`}>
                    {person.name}
                  </NavLink>
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>{person.motherName}</td>
                <td>{person.fatherName}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
};
