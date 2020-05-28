import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { PeopleTable } from './PeopleTable';
import { getPeople } from './api';


function preparePerson(person: Person, all: Person[]): Person {
  return {
    ...person,
    mother: all.find(mother => mother.name === person.motherName),
    father: all.find(father => father.name === person.fatherName),
  };
}

export const PeoplePage = () => {
  const [data, setData] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then((res) => {
        const preparedData: Person[] = res.map((person: Person) => preparePerson(person, res));

        setData(preparedData);
      });
  });

  const history = useHistory();
  const location = useLocation();
  const applyFilter = (value: string) => {
    history.push({
      search: `?query=${value}`,
    });
  };

  const historyDebounce = debounce(applyFilter, 1000);

  const searchParams = new URLSearchParams(location.search);
  const query: string = searchParams.get('query')?.toLocaleLowerCase() || '';
  const [value, setValue] = useState<string>();

  const filteredPeople = data.filter((person) => person.name.toLowerCase().includes(query)
    || person.fatherName?.toLowerCase().includes(query)
    || person.motherName?.toLowerCase().includes(query));


  return (
    <>
      <h3 className="title is-2 is-spaced header">People page</h3>
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="enter person name"
          value={value}
          onChange={(event) => {
            if (event.target) {
              setValue(event.target.value);
              historyDebounce(event.target.value);
            }
          }}
        />
      </div>
      {data && (<PeopleTable people={filteredPeople} />)}
    </>
  );
};
