import React, {
  useState, useEffect, useMemo,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getPeople, TABLE_TITLES } from '../api/api';
import { PersonRow } from '../Person/PersonRow';
import './PeopleTable.scss';

const filterPeople = (people: Person[], query: string) => {
  return (
    people.filter((person) => (person.name + person.fatherName + person.motherName)
      .toLowerCase()
      .includes(query.toLowerCase()))
  );
};

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const query = useMemo(() => searchParams.get('query') || '', [searchParams]);
  const sortBy = useMemo(() => searchParams.get('sortBy') || '', [searchParams]);
  const sortOrder = useMemo(() => searchParams.get('sortOrder') || '', [searchParams]);

  useEffect(() => {
    getPeople()
      .then(data => setPeople(
        data.map((person, index) => {
          const mother = data.find(mom => mom.name === person.motherName);
          const father = data.find(dad => dad.name === person.fatherName);

          return {
            ...person,
            id: index + 1,
            motherSlug: mother?.slug || person.motherName,
            fatherSlug: father?.slug || person.fatherName,
          };
        }),
      ));
  }, []);


  const handlerChange = (event: { target: { value: string } }) => {
    searchParams.set('query', event.target.value);
    history.push({
      search: searchParams.toString(),
    });
  };

  const preparedPeople = useMemo(() => filterPeople(people, query), [people, query]);

  useMemo(() => {
    switch (sortBy) {
      case 'id':
      case 'born':
      case 'died':
        preparedPeople.sort((a, b) => a[sortBy] - b[sortBy]);
        break;
      case 'name':
      case 'sex':

        preparedPeople.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
        break;
      default:
    }
  },
  [preparedPeople, sortBy]);

  useMemo(() => {
    switch (sortOrder) {
      case 'desc':
        preparedPeople.reverse();
        break;
      default:
    }
  },
  [preparedPeople, sortOrder]);


  const handleTitleClick = (title: string) => {
    if (title === 'mother' || title === 'father') {
      return;
    }

    if (sortBy === title && sortOrder === 'asc') {
      searchParams.set('sortOrder', 'desc');
    } else {
      searchParams.set('sortOrder', 'asc');
    }

    searchParams.set('sortBy', title);
    history.push({
      search: searchParams.toString(),
    });
  };

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={handlerChange}
      />
      <table className="people" role="grid">
        <thead>
          <tr>
            {TABLE_TITLES.map((title: string) => (
              <th
                key={title}
                onClick={() => handleTitleClick(title.toLowerCase())}
              >
                {title}
                {title.toLowerCase() === sortBy && <span className="sortFlag">*</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <PersonRow people={preparedPeople} />
        </tbody>
      </table>
    </>
  );
};
