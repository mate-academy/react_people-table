import React, { FC, useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { useHistory, useLocation } from 'react-router-dom';

import './Input.css';

export const Input: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';

  const [visibleQuery, setVisibleQuery] = useState<string>(query);

  const prepareQueryToUpdate = useCallback(
    debounce((NewQuery: string) => {
      if (NewQuery) {
        searchParams.set('query', NewQuery);
      } else {
        searchParams.delete('query');
      }

      history.push({
        search: searchParams.toString(),
      });
    }, 500),
    [],
  );

  const handleQueryUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setVisibleQuery(value);
    prepareQueryToUpdate(value);
  };

  return (
    <div className="wrapper">
      <input
        className="form-control"
        placeholder="Type name here"
        type="text"
        value={visibleQuery}
        onChange={handleQueryUpdate}
      />
    </div>
  );
};
