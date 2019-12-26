import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Person from './Person';

const PeopleTable = ({ people }) => {
  const [isSorting, setIsSorting] = useState('id');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSelected, setIsSelected] = useState('');

  const toggler = (person) => {
    setIsSelected(person.name);
  };

  const header = [
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

  const getSortMethod = (title) => {
    switch (title) {
      case 'id':
      case 'age':
      case 'century':
      case 'born':
      case 'died':
        return (a, b) => a[title] - b[title];
      case 'name':
      case 'sex':
        return (a, b) => a[title].localeCompare(b[title]);
      default: return undefined;
    }
  };

  const sortPeopleBy = (title) => {
    const visiblePeople = people;

    if (title !== isSorting) {
      visiblePeople.sort(getSortMethod(title));
      setIsSorting(title);
    } else {
      visiblePeople.reverse();
      setIsSorting('');
    }
  };

  const handleChange = (value) => {
    setSearchTerm(
      value.trim().toLowerCase()
    );
  };

  const debounce = (f, delay) => {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => f(...args), delay);
    };
  };

  const debouncedHandleChange = debounce(handleChange, 1000);

  const filteredPeople = !searchTerm
    ? people
    : people
      .filter(person => person.name.toLowerCase()
        .includes(searchTerm.trim().toLowerCase())
      || (person.mother && person.mother.toLowerCase()
        .includes(searchTerm.trim().toLowerCase()))
      || (person.father && person.father.toLowerCase()
        .includes(searchTerm.trim().toLowerCase())));

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
            {` ${filteredPeople.length}
                  ${filteredPeople.length === 1 ? 'person' : 'persons'} found`}
          </span>
        )
      }
      <table className="people-table">
        <thead>
          <tr>
            {header.map(head => (
              ['mother', 'father', 'children'].includes(head) ? (
                <td
                  key={head}
                  role="presentation"
                >
                  {head}
                </td>
              ) : (
                <td
                  key={head}
                  role="presentation"
                  onClick={() => sortPeopleBy(head)}
                >
                  {head}
                </td>
              )
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredPeople.map(person => (
            <tr
              key={person.name}
              className={cn(
                'person',
                {
                  'person--male': person.sex === 'm',
                  'person--female': person.sex === 'f',
                },
                `person person--lived-in-${Math.ceil(person.died / 100)}`,
                { 'person--selected': isSelected === person.name }
              )}
              onClick={() => toggler(person)}
            >
              <Person person={person} />
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
