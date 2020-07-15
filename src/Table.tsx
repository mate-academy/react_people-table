import React, { useState } from 'react';
import { Person } from './interfaces';
import { PersonRow } from './PersonRow';
import { useHistory, useLocation } from 'react-router-dom';
import { TableHead } from './TableHead';

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
  const setParams = (header: keyof Person) => {
    const order =  direction ? 'forward' : 'reverse';
    searchParams.set('sortBy', `${header}`);
    searchParams.set('sortOrder', `${order}`);

    history.push({
      search: searchParams.toString(),
    });
    sortBy(header)
  };

  const sortBy = (header: keyof Person) => {
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

    handleSorting([...sorted]);

    setDirection(!direction);
  }

  const findParent = (name: string) => {
    const parent = list.find(human => human.name === name);

    return parent;
  };

  return (
    <>
      <table className="table table-sm">
        <TableHead setParams={setParams} />
        <tbody>
          {
            list.map((person, index) => {
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
