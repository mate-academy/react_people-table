import React, { useState, useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { debounce } from '../../helpers/debounce';
import './PeopleFilter.css';

const PeopleFilter = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';
  const [currentQuery, setCurrentQuery] = useState(query);

  useEffect(() => {
    setCurrentQuery(query);
  }, [query]);

  const updateQuery = useCallback(
    debounce(
      (query: string) => {
        if (query) {
          searchParams.set('query', query);
        } else {
          searchParams.delete('query');
        }

        history.push({
          search: searchParams.toString(),
        });
      }, 1000
    ), []
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuery(event.target.value);
    updateQuery(event.target.value);
  }

  return (
    <input
      className="people-table__search-pannel"
      type="text"
      value={currentQuery}
      onChange={handleInputChange}
      placeholder="Search People..."
    />
  )
}

export default PeopleFilter;
