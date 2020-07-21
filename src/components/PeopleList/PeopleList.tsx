import React, { FC, useState, useEffect } from 'react';
import { getData } from '../../api/api';
import { PeopleListInterface } from '../../interfaces';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeopleList: FC = () => {
  const [people, getPeople] = useState<PeopleListInterface[]>([]);

  async function fetchData() {
    const peopleFromServer = await getData();

    getPeople(peopleFromServer);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>1</h1>
      <PeopleTable people={people} />
    </div>
  );
};
