import React, { FC, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';

export const SearchBar: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [value, setValue] = useState<string>(searchParams.get('query') || '');

  return (
    <form className="form-inline my-2 my-lg-0 ml-2">
      <input
        className="form-control mr-sm-2"
        type="text"
        value={value}
        placeholder="Search"
        onChange={(event) => {
          setValue(event.target.value);
          searchParams.set('query', event.target.value);
          history.push({
            search: searchParams.toString(),
          });
        }}
      />
    </form>
  );
};
