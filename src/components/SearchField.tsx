import React, { useState, useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { useLocation, useHistory } from 'react-router-dom';

const SearchField = () => {
  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const query = useMemo(() => searchParams.get('query') || '', [searchParams]);

  const [visibleQuery, setVisibleQuery] = useState(query);

  const updateQuery = (queryValue: string) => {
    if (queryValue) {
      searchParams.set('query', queryValue);
    } else {
      searchParams.delete('query');
    }

    history.push({
      search: searchParams.toString(),
    });
  };

  const planQueryUpdate = useCallback(
    debounce(updateQuery, 500),
    [],
  );

  const handleQueryUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibleQuery(event.target.value);
    planQueryUpdate(event.target.value);
  };

  return (
    <input
      type="text"
      value={query ? visibleQuery : ''}
      className="search-field"
      placeholder="find person..."
      onChange={handleQueryUpdate}
    />
  );
};

export default SearchField;
