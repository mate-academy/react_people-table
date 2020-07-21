import React, { FC, useState, useEffect } from 'react';
import { getData } from '../../api/api';
import { PeopleListInterface } from '../../interfaces';

interface PeopleListProps {
  path: string;
}

export const PeopleList: FC<PeopleListProps> = ({ path }) => {
  const [people, getPeople] = useState<PeopleListInterface[]>([]);

  useEffect(() => {
    async function fetchData() {
      const peopleFromServer = await getData();

      getPeople(peopleFromServer);
    }

    fetchData();
  }, []);

  console.log(people);

  return (
    <div>
      <h1>{path}</h1>
      <PeopleTable people={people} />
    </div>
  );
};
