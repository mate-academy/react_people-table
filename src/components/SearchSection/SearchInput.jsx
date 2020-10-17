import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './SearchInput.scss';

export const SearchInput = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';

  return (
    <div className="search_person_block">
      <input
        className="search_person_input"
        placeholder="Find person"
        type="text"
        value={query}
        onChange={(event) => {
          searchParams.set('query', (event.target.value).toLocaleLowerCase());
          history.push({
            search: searchParams.toString() === 'query='
              ? ''
              : searchParams.toString(),
          });
        }}
      />
    </div>
  );
};
