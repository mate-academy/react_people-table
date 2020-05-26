import React, { useState, useEffect } from 'react';
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
  const [data, setData] = useState<Person[]>();

  useEffect(() => {
    getPeople()
      .then((res) => {
        const preparedData: Person[] = res.map((person: Person) => preparePerson(person, res));

        setData(preparedData);
      });
  });

  return (
    <>
      <h3>People page</h3>
      {data && (<PeopleTable people={data} />)}
    </>
  );
};
