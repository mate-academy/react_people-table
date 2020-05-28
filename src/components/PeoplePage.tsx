/* eslint-disable jsx-a11y/accessible-emoji */
import React, {
  useState, useEffect, ChangeEventHandler, useCallback, useMemo,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { getPeople } from '../helpers/api';
import { PersonRow } from './PersonRow';

const tableHeader = ['id', 'name', 'sex', 'born', ' - ', 'died', 'mother', 'father'];

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [query, setQuery] = useState('');

  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);

  const applyQueryWithDebaunce = useCallback(
    debounce((queryValue: string) => {
      if (!queryValue) {
        searchParams.delete('query');
      } else {
        searchParams.set('query', queryValue);
      }

      history.push({ search: searchParams.toString() });
    }, 1000), [],
  );

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setQuery(target.value);
    applyQueryWithDebaunce(target.value);
  };

  const queryFromUrl = searchParams.get('query') || '';
  const isSortedAsc = searchParams.get('sortOrder') !== 'desc';
  const sortBy = searchParams.get('sortBy') || '';

  useEffect(() => setQuery(queryFromUrl), [queryFromUrl]);

  useEffect(() => {
    getPeople().then(peopleFromServer => {
      const preparedPeople = peopleFromServer.map((person: Person, index: number) => ({
        id: index + 1,
        ...person,
        mother: peopleFromServer.find((mom: { name: string }) => mom.name === person.motherName) || '',
        father: peopleFromServer.find((dad: { name: string }) => dad.name === person.fatherName) || '',
      }));

      return setPeople(preparedPeople);
    });
  }, []);

  const visiblePeople = useMemo(() => {
    const result = people.filter(({ name, fatherName, motherName }) => {
      return (name + motherName + fatherName).toLowerCase().includes((queryFromUrl).toLowerCase());
    });

    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'born':
        result.sort((a, b) => a.born - b.born);
        break;
      case 'died':
        result.sort((a, b) => a.died - b.died);
        break;
      case 'sex':
        result.sort((a, b) => a.sex.localeCompare(b.sex));
        break;
      case 'motherName':
        result.sort((a, b) => a.motherName.localeCompare(b.motherName));
        break;
      case 'fatherName':
        result.sort((a, b) => a.fatherName.localeCompare(b.fatherName));
        break;
      default:
    }

    if (!isSortedAsc) {
      result.reverse();
    }

    return result;
  }, [queryFromUrl, isSortedAsc, people]);

  return (
    <>
      <h2>People Page perhaps</h2>
      <div className="search-field">
        <input
          type="text"
          className="search-field__input"
          value={query}
          onChange={(event) => handleInputChange(event)}
        />
      </div>
      {visiblePeople.length === 0
        ? <h3>No requested data, dude</h3>
        : (
          <table className="table">
            <thead>
              <tr>
                {tableHeader.map(item => {
                  return (
                    <th
                      className="table__header"
                      key={item}
                      onClick={() => {
                        searchParams.set('sortOrder', isSortedAsc ? 'desc' : 'asc');
                        searchParams.set('sortBy', item);
                        history.push({ search: searchParams.toString() });
                      }}
                    >
                      {item.toUpperCase()}
                      {' '}
                      {item === sortBy && (isSortedAsc ? <span className="arrow">⬆️</span> : <span className="arrow">⬇️</span>)}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {visiblePeople.map(person => (
                <PersonRow key={person.slug} person={person} />
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};
