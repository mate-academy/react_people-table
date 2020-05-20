import React, { useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { debounce } from '../helper/debounce';

interface Props {
  startDebounce: (str: string) => void;
}

let type = '';
let sortOrder = '';

export const SearchPeople: React.FC<Props> = ({ startDebounce }) => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';
  const sorting = searchParams.get('sortBy');
  const order = searchParams.get('sortOrder');

  useEffect(() => {
    startDebounce('')
  }, [])

  if (sorting) {
    type = sorting;
  }

  if (order) {
    sortOrder = order;
  }

  useEffect(() => {
    if (query) {
      startDebounce(query);
    }
  }, []);

  const setDebounce = (value: string) => {
    debounceWrapper(value);
  };

  const planSetQuery = (value: string) => {
    if (value) {
      searchParams.set('query', value);
    } else {
      searchParams.delete('query');
    }

    type && searchParams.set('sortBy', type);
    sortOrder && searchParams.set('sortOrder', sortOrder);

    history.push({
      search: searchParams.toString(),
    });
  };

  const debounceWrapper = useCallback(
    debounce((value: string) => planSetQuery(value), 1000),
    [],
  );

  return (
    <div className="input-group input-group-lg myInput">
      <input
        type="text"
        className="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-lg"
        placeholder="Write for search"
        defaultValue={query}
        onChange={e => {
          setDebounce(e.target.value);
          startDebounce(e.target.value);
        }}
      />
    </div>
  );
};
