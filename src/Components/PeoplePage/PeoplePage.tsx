import React, { FC, useState, useEffect } from 'react';
import { getPeople } from '../PreparedList/getPeople';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { PersonType } from '../interfaces/interfaces';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<PersonType[]>([]);

  const fetchData = async () => {
    const arr = await getPeople();

    setPeople(arr);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <PeopleTable people={people} />;
};
