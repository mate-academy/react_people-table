import React, { FC, useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

type handleQueryUpdateType = (event: React.ChangeEvent<HTMLInputElement>) => void;

export const SearchBar: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';
  const [value, setValue] = useState<string>(query);

  const debounce = (func: (s: string) => void, delay: number) => {
    let timerId: number;

    return (...args: string []) => {
      clearTimeout(timerId);

      timerId = setTimeout(func, delay, ...args);
    };
  };

  const queryUpdate = (searchedQuery: string) => {
    if (searchedQuery) {
      searchParams.set('query', searchedQuery);
    } else {
      searchParams.delete('query');
    }

    history.push({
      search: searchParams.toString(),
    });
  };

  const delayedQueryUpdate = useCallback(
    debounce(queryUpdate, 500), [],
  );

  const handleQueryUpdate: handleQueryUpdateType = (event) => {
    delayedQueryUpdate(event.target.value);
    setValue(event.target.value);
  };

  return (
    <form className="form-inline my-2 my-lg-0 ml-2">
      <input
        className="form-control mr-sm-2"
        type="text"
        value={value}
        placeholder="Search"
        onChange={handleQueryUpdate}
      />
    </form>
  );
};
