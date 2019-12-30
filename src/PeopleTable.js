import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Person from './Person';
import getData from './getDataApi';

const peopleURL
  = 'https://mate-academy.github.io/react_people-table/api/people.json';

const getPeopleWithChildren = listOfPeople => (
  listOfPeople.map((person, index) => ({
    ...person,
    children: listOfPeople
      .filter(child => (
        child.father === person.name || child.mother === person.name)),
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
    id: index + 1,
  }))
);

const PeopleTable = ({ match, history, location }) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    loadPeopleFromServer();
  }, []);

  const loadPeopleFromServer = async() => {
    try {
      const peopleList = await getData(peopleURL);

      setPeople([...getPeopleWithChildren(peopleList)]);
    } catch {
      setPeople([]);
    }
  };

  const urlParams = new URLSearchParams(location.search);

  const handleSearchingInputChange = ({ target: { value } }) => {
    urlParams.set('query', value.toLowerCase());
    history.push({ search: urlParams.toString() });
  };

  const getSearchedPeople = (listOfPeople, searchingName) => (
    listOfPeople.filter(person => (
      person.name.toLowerCase().includes(searchingName)
      || (person.father || '').toLowerCase()
        .includes(searchingName)
      || (person.mother || '').toLowerCase()
        .includes(searchingName)
    )));

  const getSortedPeople = (listOfPeople, sortingTitle) => (
    listOfPeople.sort((firstPerson, secondPerson) => (
      typeof firstPerson[sortingTitle] === 'string'
        ? firstPerson[sortingTitle].localeCompare(secondPerson[sortingTitle])
        : firstPerson[sortingTitle] - secondPerson[sortingTitle]
    )));

  const setSortBy = (sortingTitle) => {
    if (urlParams.get('sortBy') === sortingTitle
      && urlParams.get('sortOrder') === 'asc') {
      urlParams.set('sortOrder', 'desc');
    } else {
      urlParams.set('sortOrder', 'asc');
    }

    if (sortingTitle === urlParams.get('sortBy')) {
      setPeople([...people].reverse());
    } else {
      setPeople([...getSortedPeople(people, sortingTitle)]);
    }

    urlParams.set('sortBy', sortingTitle);
    history.push({ search: urlParams.toString() });
  };

  const titles = [
    'id',
    'name',
    'sex',
    'born',
    'died',
    'age',
    'century',
    'mother',
    'father',
    'children',
  ];

  return (
    <>
      <input
        onChange={handleSearchingInputChange}
        className="people__search"
        type="text"
        placeholder="Search"
      />
      <table className="people-table">
        <thead>
          <tr>
            {titles.map((title) => {
              switch (title) {
                case 'mother':
                case 'father':
                case 'children':
                  return (
                    <th>{title.toUpperCase()}</th>
                  );
                default:
                  return (
                    <th
                      className={
                        cn(
                          'title--sortable',
                          { 'title--active': urlParams.get('sortBy') === title }
                        )}
                      onClick={() => setSortBy(title)}
                    >
                      {title.toUpperCase()}
                    </th>
                  );
              }
            })}
          </tr>
        </thead>
        <tbody>
          {[...getSearchedPeople([...people], urlParams.get('query') || '')]
            .map(currentPerson => (
              <Person
                key={currentPerson.id}
                titles={titles}
                person={currentPerson}
                match={match}
                history={history}
                location={location}
              />
            ))}
        </tbody>
      </table>
    </>
  );
};

PeopleTable.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      personName: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape(
    { push: PropTypes.func },
  ).isRequired,
  location: PropTypes.shape({
    search: PropTypes.shape({}),
  }).isRequired,
};

export default PeopleTable;
