import React, {
  useState, useCallback, useEffect, useMemo,
} from 'react';
import debounce from 'lodash.debounce';
import { useHistory, useLocation } from 'react-router-dom';
import { Person } from '../../helpers';
import { PersonRow } from '../PersonRow/PersonRow';

import './PeopleTable.scss';

const titles: Array<string> = ['ID', 'Name', 'Sex', 'Born', 'Died', 'Age', 'Century', 'Father', 'Mother'];

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [query, setQuery] = useState('');

  const location = useLocation();
  const history = useHistory();

  const searchParams = new URLSearchParams(location.search);
  const sortBy: string = searchParams.get('sortBy') || '';
  const sortOrder: string = searchParams.get('sortOrder') || '';
  const lowerCaseQuery = (searchParams.get('query') || '').toLocaleLowerCase();

  useEffect(() => {
    setQuery(lowerCaseQuery);
  }, [lowerCaseQuery]);

  const applyQueryWithDebounce = useCallback(
    debounce((queryDebounce: string) => {
      searchParams.set('query', queryDebounce);
      history.push({ search: searchParams.toString() });
    }, 1000),
    [],
  );

  const visiblePeople = useMemo(
    () => people.filter(person => (
      person.name.toLowerCase().includes(lowerCaseQuery))),
    [lowerCaseQuery, people],
  );

  const setSortParam = (title: string) => {
    const sortOrderParam = (sortOrder === 'asc') ? 'desc' : 'asc';

    if (titles.includes(title)) {
      searchParams.set('sortBy', `${title}`);
      searchParams.set('sortOrder', `${sortOrderParam}`);

      history.push({
        search: searchParams.toString(),
      });
    }
  };

  useMemo(() => {
    const sortingType = sortBy.toLowerCase();

    switch (sortOrder) {
      case 'asc':
        switch (sortingType) {
          case 'born':
          case 'died':
            visiblePeople.sort((a, b) => a[sortingType] - b[sortingType]); break;

          case 'name':
          case 'sex':
            visiblePeople.sort((a, b) => a[sortingType].localeCompare(b[sortingType])); break;

          default:
        }

        break;
      case 'desc':
        switch (sortingType) {
          case 'born':
          case 'died':
            visiblePeople.sort((a, b) => b[sortingType] - a[sortingType]); break;

          case 'name':
          case 'sex':
            visiblePeople.sort((a, b) => b[sortingType].localeCompare(a[sortingType])); break;

          default:
        }

        break;
      default:
    }
  },
  [people, sortOrder, sortBy]);

  return (
    <div className="people__container">
      <h1>People Table</h1>

      <div className="search__container">
        <input
          type="text"
          placeholder="Search person..."
          value={query}
          onChange={({ target }) => {
            setQuery(target.value);
            applyQueryWithDebounce(target.value);
          }}
        />
      </div>

      <div className="people__table">
        <table>
          <thead>
            <tr>
              {titles.map(title => (
                <th key={title}>
                  <button
                    type="button"
                    onClick={() => setSortParam(title)}
                  >
                    <span>{`${title} ⇅`}</span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visiblePeople.map(({
              name, sex, born, died, fatherName, motherName, slug,
            }, index) => (
              <PersonRow
                key={slug}
                index={index + 1}
                name={name}
                sex={sex}
                born={born}
                died={died}
                father={fatherName}
                mother={motherName}
                slug={slug}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
