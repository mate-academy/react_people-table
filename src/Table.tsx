import React, { useState } from 'react';
import { Person } from './interfaces';
import { PersonRow } from './PersonRow';
import { useHistory, useLocation } from 'react-router-dom';

interface Props {
  list: Person[];
  id: string;
  path: string;
  handleSorting: (sorted: Person[]) => (void);
}

// const headers = ['#', 'name', 'sex', 'born', 'died', 'motherName', 'fatherName'];

export const Table: React.FC<Props> = ({ list, handleSorting, id }) => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [direction, setDirection] = useState(false);
  const sortBy = (header: keyof Person) => {
    searchParams.set('sortBy', `${header}`);
    searchParams.set('sortOrder', `${direction}`);

    history.push({
      search: searchParams.toString(),
    });
    const sorted: Person[] = [...list].sort((a, b) => {
      const aHeader = a[header];
      const bHeader = b[header];

      if (aHeader !== undefined && bHeader !== undefined && typeof aHeader === typeof bHeader) {
        if (direction) {
          return (aHeader <= bHeader) ? 1 : -1;
        }

        return (aHeader >= bHeader) ? 1 : -1;
      }

      return 1;
    });

    handleSorting(sorted);

    setDirection(!direction);
  };

  const findParent = (name: string) => {
    const parent = list.find(human => human.name === name);

    return parent;
  };

  return (
    <>
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" onClick={() => sortBy('name')}>name</th>
            <th scope="col" onClick={() => sortBy('sex')}>sex</th>
            <th scope="col" onClick={() => sortBy('born')}>born</th>
            <th scope="col" onClick={() => sortBy('died')}>died</th>
            <th scope="col" onClick={() => sortBy('motherName')}>mother</th>
            <th scope="col" onClick={() => sortBy('fatherName')}>father</th>
          </tr>
        </thead>
        <tbody>
          {
            list.map((person, index) => {
              console.log(person.slug, 'slug', id, 'di');
              const active = person.slug === id ? 'active-person' : 'non-active';
              const sex = person.sex === 'f' ? 'woman' : 'man';

              return (
                <PersonRow
                  key={person.slug}
                  person={person}
                  index={index}
                  findParent={findParent}
                  active={active}
                  sex={sex}
                />
              );
            })
          }
        </tbody>
      </table>
    </>
  );
};
