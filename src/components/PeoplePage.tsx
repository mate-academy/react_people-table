import React,
{
  useEffect,
  useState,
  ChangeEventHandler,
  MouseEventHandler,
} from 'react';
import { useHistory, useLocation } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import { PeopleTable } from './PeopleTable';
import { loadPeople } from '../api';
import { PersonWithParents } from './types';

export const PeoplePage = (props: RouteComponentProps) => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const query = searchParams.get('query') || '';
  const [people, setPeople] = useState<PersonWithParents[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<PersonWithParents[]>([]);

  const onChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    searchParams.set('query', target.value);
    history.push({
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    loadPeople().then(setPeople);
    setVisiblePeople(people);
  }, []);

  useEffect(() => {
    setVisiblePeople(people
      .filter(person => person.name.toLowerCase().includes(query.toLowerCase())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase())
        || person.motherName?.toLowerCase().includes(query.toLowerCase())));
  }, [query, people]);

  const handleSorting: MouseEventHandler<{innerHTML: string}> = (event) => {
    const sortParam = event.currentTarget === null ? '' : event.currentTarget.innerHTML;

    searchParams.set('sortBy', sortParam);
    if (searchParams.get('sortOrder') === 'asc') {
      searchParams.set('sortOrder', 'desc');
    } else {
      searchParams.set('sortOrder', 'asc');
    }

    history.push({
      search: searchParams.toString(),
    });
  };

  return (
    <>
      <h2>People page</h2>
      <DebounceInput
        className="form-control shadow-lg p-3 mb-5 bg-white rounded"
        debounceTimeout={500}
        type="text"
        value={query}
        onChange={onChange}
        placeholder="search"
      />
      <PeopleTable peoples={visiblePeople} url={props.match.url} handleSorting={handleSorting} />
    </>
  );
};
