import React, { useState, useEffect } from 'react';
import { getPeople } from '../helpers/api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [tableWithPeople, setTableWithPeople] = useState<PreparedPerson[]>([]);

  useEffect(() => {
    const getDataFromServer = async () => {
      const { data } = await getPeople();

      setTableWithPeople(data.map((person: Person) => ({
        ...person,
        fatherName: data.find((father: Person) => person.fatherName === father.name),
        motherName: data.find((mother: Person) => person.motherName === mother.name),
      })));
    };

    getDataFromServer();
  }, []);

  return (
    <>
      <PeopleTable people={tableWithPeople} />
    </>
  );
};
