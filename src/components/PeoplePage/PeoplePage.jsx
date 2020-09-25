import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState(null);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  // console.log(people);

  return (
    <>
      <h1>People Page</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
      </table>
    </>
  );
};
