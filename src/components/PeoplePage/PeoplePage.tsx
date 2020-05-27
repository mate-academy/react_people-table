import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';
import THead from '../THead/THead';
import TBody from '../TBody/TBody';
import './PeoplePage.scss';

type Props = {
  people: PersonWithParents[];
};

const PeoplePage: React.FC<Props> = React.memo(
  ({ people }) => {
    const [query, setQuery] = useState('');

    const history = useHistory();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const lowerQuery = (searchParams.get('query') || '').toLowerCase();

    useEffect(() => {
      setQuery(lowerQuery);
    }, [lowerQuery]);

    const applyQuery = useCallback(
      debounce((queryDebounce: string) => {
        if (queryDebounce) {
          searchParams.set('query', queryDebounce);
        } else {
          searchParams.delete('query');
        }

        history.push({ search: searchParams.toString() });
      }, 500),
      [],
    );

    const visiblePeople = useMemo(
      () => people.filter(({ name, motherName, fatherName }) => (name + motherName + fatherName)
        .toLowerCase().includes(lowerQuery)),
      [lowerQuery, people],
    );

    return (
      <div className="peoplePage">
        <h1 className="peoplePage__head">People Table</h1>

        <input
          type="text"
          value={query}
          onChange={({ target }) => {
            setQuery(target.value);
            applyQuery(target.value);
          }}
          className="peoplePage__input"
        />

        <table className="peoplePage__wrapper">
          <THead />

          <tbody>
            {visiblePeople.map(person => (
              <TBody
                person={person}
                key={person.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);

export default PeoplePage;
