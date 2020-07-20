import React, { useMemo, useState } from 'react';
import { Person } from './interfaces';
import { PersonRow } from './PersonRow';
import { useHistory, useLocation } from 'react-router-dom';
import { TableHead } from './TableHead';
import { Search } from './Search';

interface Props {
  list: Person[];
  id: string;
}


export const Table: React.FC<Props> = ({ list, id }) => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query: string = searchParams.get('query') || '';
  const [persons, setPersons] = useState(list);
  const sortByOption: string = searchParams.get('sortBy') || '';
  const sortOrder: string = searchParams.get('sortOrder') || '';

  const setParams = (header: keyof Person) => {
    const order =  sortOrder==='forward' ? 'reverse' :'forward' ;
    searchParams.set('sortBy', `${header}`);
    searchParams.set('sortOrder', `${order}`);

    history.push({
      search: searchParams.toString(),
    });
  };

  useMemo(() => {
    setPersons(list);
  }, [list]);

  useMemo(() => {
     let sorted: Person[];
     console.log(query, sortOrder)
     if(sortOrder==='forward') {
      switch (sortByOption) {
        case 'born':
        case 'died':
          sorted = persons.sort((a, b) => a[sortByOption] - b[sortByOption]);
          setPersons(sorted)
          break;

        case 'name':
        case 'sex':
          sorted = persons.sort((a, b) => a[sortByOption].localeCompare(b[sortByOption]));
          setPersons(sorted)
          break;

        default:
        }
     } else {
      switch (sortByOption) {
        case 'born':
        case 'died':
          sorted = persons.sort((a, b) => b[sortByOption] - a[sortByOption]);
          setPersons(sorted)
          break;

        case 'name':
        case 'sex':
          sorted = persons.sort((a, b) => b[sortByOption].localeCompare(a[sortByOption]));
          // const filtered
          setPersons(sorted)
          break;

        default:
        }
     }
   }, [sortByOption, sortOrder, persons])

  const findParent = (name: string) => {
    const parent = persons.find(human => human.name === name);

    return parent;
  };

  const setFiltered = (value: string) => {
    // const filtered = list.filter(person => person.name.includes(value));
    // setPersons(filtered);
    searchParams.set('query', `${value}`);
    history.push({
      search: searchParams.toString(),
    });
  }

  return (
    <>
      <Search setFiltered={setFiltered} value={query} />
      <table className="table table-sm">
        <TableHead setParams={setParams} />
        <tbody>
          {
            persons.map((person, index) => {
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
