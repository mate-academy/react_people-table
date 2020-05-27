import React, { useState, useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';

export const InputFilter = () => {
  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const query: string = searchParams.get('query') || '';
  const [currentQuery, setCurrentQuery] = useState<string>(query);

  const searchQueryWithDebounce = useCallback(debounce(history.push, 500), []);

  const handleSearchChange = (event: { target: { value: string }}) => {
    setCurrentQuery(event.target.value);
    searchParams.set('query', event.target.value);
    searchQueryWithDebounce({
      // search: searchParams.toString(),
      search: `?query=${event.target.value}`,
    });
  };

  useEffect(() => {
    setCurrentQuery(query);
  }, [query]);

  return (
    <>
      <input
        className="form-control"
        type="text"
        placeholder="Type Person Name, Father Name or Mother Name"
        value={currentQuery}
        onChange={handleSearchChange}
      />
    </>
  );
};
