import React, { useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Person from './Person';

const UNSORTABLE_TITLES = ['mother', 'father', 'children'];
const PeopleTable = ({ people }) => {
  const [isSorting, setIsSorting] = useState('id');
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();
  const params = new URLSearchParams(location.search);

  const headers = [
    'id',
    'name',
    'sex',
    'born',
    'died',
    'mother',
    'father',
    'age',
    'century',
    'children',
  ];

  const getSortMethod = (title, order) => {
    switch (title) {
      case 'id':
      case 'age':
      case 'century':
      case 'born':
      case 'died':
        if (order === 'asc') {
          return (a, b) => a[title] - b[title];
        }

        if (order === 'desc') {
          return (a, b) => b[title] - a[title];
        }

        return undefined;

      case 'name':
      case 'sex':
        if (order === 'asc') {
          return (a, b) => a[title].localeCompare(b[title]);
        }

        if (order === 'desc') {
          return (a, b) => b[title].localeCompare(a[title]);
        }

        return undefined;

      default: return undefined;
    }
  };

  const sortPeopleBy = (title) => {
    const visiblePeople = people;

    if (title !== isSorting) {
      visiblePeople.sort(getSortMethod(title));
      setIsSorting(title);
      params.set('sortBy', title);
      history.push({ search: `?${params.toString()}` });
      params.set('sortOrder', 'asc');
      history.push({ search: `?${params.toString()}` });
    } else {
      visiblePeople.reverse();
      setIsSorting('');
      params.set('sortOrder', 'desc');
      history.push({ search: `?${params.toString()}` });
    }
  };

  const handleChange = (value) => {
    params.set('query', value.trim().toLowerCase());
    !value.trim() && params.delete('query');
    history.push({ search: `${params.toString()}` });
  };

  const debounce = (f, delay) => {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => f(...args), delay);
    };
  };

  const debouncedHandleChange = debounce(handleChange, 1000);

  const setHistory = person => history.push({
    pathname: `${person.name.split(' ').join('-').toLowerCase()}`,
    search: location.search,
  });

  const visiblePeople = !params.get('query')
    ? [...people]
      .sort(getSortMethod(params.get('sortBy'), params.get('sortOrder')))
    : people
      .filter(person => (person.name + person.mother + person.father)
        .toLowerCase()
        .includes(params.get('query')))
      .sort(getSortMethod(params.get('sortBy'), params.get('sortOrder')));

  return (
    <>
      <input
        type="text"
        className="people-list__searchInput"
        placeholder="Search"
        onChange={e => debouncedHandleChange(e.target.value)}
      />
      {
        (
          <span className="people-list__person-count">
            {` ${visiblePeople.length}
                  ${visiblePeople.length === 1 ? 'person' : 'persons'} found`}
          </span>
        )
      }
      <table className="people-table">
        <thead>
          <tr>
            {headers.map(header => (
              UNSORTABLE_TITLES.includes(header) ? (
                <td
                  key={header}
                  role="presentation"
                >
                  {header}
                </td>
              ) : (
                <td
                  key={header}
                  role="presentation"
                  onClick={() => sortPeopleBy(header)}
                >
                  {header}
                </td>
              )
            ))}
          </tr>
        </thead>
        <tbody>
          {visiblePeople.map(person => (
            <tr
              key={person.name + person.father}
              className={cn(
                'person',
                {
                  'person--male': person.sex === 'm',
                  'person--female': person.sex === 'f',
                },
                `person person--lived-in-${Math.ceil(person.died / 100)}`,
                { 'person--selected': person.name
                  .split(' ').join('-').toLowerCase() === match.params.name },
              )}
              onClick={() => setHistory(person)}
            >
              <Person personData={person} headers={headers} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default PeopleTable;
