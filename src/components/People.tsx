import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import getPeople, { Person } from '../helpers/api';

type Props = {
  currentPerson: string;
};

const People: React.FC<Props> = ({ currentPerson }) => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(res => setPeople(
        res.map((person, i) => ({
          ...person,
          id: i + 1,
        })),
      ));
  }, []);

  const tableHeads = [
    'Name',
    'Sex',
    'Born',
    'Died',
    'Mother',
    'Father',
  ];

  return (
    <div className="page">
      <h2 className="page__title">
        People page
      </h2>
      <table className="people-table">
        <thead className="people-table__prop">
          <tr>
            {tableHeads.map(item => (
              <th
                className="people-table__prop"
                key={item}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="people-table__prop">
          {people.map(person => (
            <tr
              key={person.id}
            >
              <td className="people-table__prop">
                <Link
                  className={cn({
                    person: true,
                    person__active: currentPerson === person.name,
                  })}
                  to={`people/:${person.name}`}
                >
                  {person.name}
                </Link>
              </td>
              <td
                className={cn({
                  person__woman: person.sex === 'f',
                  person__man: person.sex === 'm',
                })}
              >
                {person.sex}
              </td>
              <td className="people-table__prop">
                {person.born}
              </td>
              <td className="people-table__prop">
                {person.died}
              </td>
              <td className="people-table__prop">
                <Link
                  to={`people/:${person.motherName}`}
                  className={cn({
                    person: true,
                    person__active: currentPerson === person.motherName,
                  })}
                >
                  {person.motherName}
                </Link>
              </td>
              <td className="people-table__prop">
                <Link
                  to={`people/:${person.fatherName}`}
                  className={cn({
                    person: true,
                    person__active: currentPerson === person.fatherName,
                  })}
                >
                  {person.fatherName}
                </Link>
              </td>
            </tr>

          ))}
        </tbody>
      </table>
    </div>
  );
};

export default People;
