import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search)
  const query: string = searchParams.get('query') || '';

  return (
    <>
      <h2>People Table</h2>
      <input
        className="form-control"
        type="text"
        placeholder="Type Person Name, Father Name or Mother Name"
        value={query}
        onChange={(event) => {
          history.push({
            search: `?query=${event.target.value}`,
          });
        }}
      />
      <PeopleTable />
    </>
  );
};
