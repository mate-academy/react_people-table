import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from './Person';

type Props = {
  people: PeopleTable[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const tableHead = ['ID', 'NAME', 'SEX', 'BORN', 'DIED', 'AGE', 'FATHER', 'MOTHER', 'CENTURY'];
  const history = useHistory();
  const { name } = useParams();

  const hangleChange = (url: string) => {
    history.push({
      pathname: `/people/${url}`,
    });
  };

  return (
    <>
      <table className="PeopleTable">
        <thead>
          <tr className="PeopleTable-head">
            {
              tableHead.map(table => (
                <td key={table} className="PeopleTable--tabs">{table}</td>
              ))
            }

          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr
              key={person.id}
              className={cn('Person', {
                'Person--active': person.slug === name,
              })}
              onClick={() => hangleChange(person.slug)}
            >
              <Person person={person} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
