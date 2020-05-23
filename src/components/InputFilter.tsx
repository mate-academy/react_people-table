import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export const InputFilter = () => {
  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const query: string = searchParams.get('query') || '';

  return (
    <>
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
    </>
  );
};
