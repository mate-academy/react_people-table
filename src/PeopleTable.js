import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Route, NavLink, Switch } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import Person from './Person';
import getData from './getDataApi';
import NewPerson from './NewPerson';

const peopleURL
  = 'https://mate-academy.github.io/react_people-table/api/people.json';

const date = new Date();

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
    if (value === '') {
      urlParams.delete('query');
      history.push({ search: urlParams.toString() });
    } else {
      urlParams.set('query', value.toLowerCase());
      history.push({ search: urlParams.toString() });
    }
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

  const setSortBy = (listOfPeople, sortingTitle, sortingOrder) => {
    if (sortingOrder === 'desc') {
      return ([...getSortedPeople(listOfPeople, sortingTitle)].reverse());
    }

    return [...getSortedPeople(listOfPeople, sortingTitle)];
  };

  const handleSortClick = (sortingTitle) => {
    if (urlParams.get('sortBy') && urlParams.get('sortOrder')) {
      if (sortingTitle === urlParams.get('sortBy')) {
        if (urlParams.get('sortOrder') === 'asc') {
          urlParams.set('sortOrder', 'desc');
        } else {
          urlParams.set('sortOrder', 'asc');
        }
      } else {
        urlParams.set('sortBy', sortingTitle);
        urlParams.set('sortOrder', 'asc');
      }
    } else {
      urlParams.set('sortBy', sortingTitle);
      urlParams.set('sortOrder', 'asc');
    }

    history.push({ search: urlParams.toString() });
  };

  const addPerson = (name, sex, born, died, mother, father) => {
    setPeople([...people, {
      name,
      sex,
      born,
      died,
      mother,
      father,
      children: people
        .filter(child => (
          child.father === name || child.mother === name)),
      age: died < Infinity ? died - born : date.getFullYear() - born,
      century:
        died < Infinity ? Math.ceil(died / 100)
          : Math.ceil(date.getFullYear() / 100),
      id:
        Math.max(...people.map(person => person.id)) + 1,
    }]);
  };

  const updateChildren = () => {
    setPeople(people.map(person => ({
      ...person,
      children: people.filter(child => (
        child.father === person.name || child.mother === person.name)),
    })));
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

  let visiblePeople = getSearchedPeople(people, urlParams.get('query') || '');

  visiblePeople = urlParams.get('sortBy') && urlParams.get('sortOrder')
    ? setSortBy([...visiblePeople],
      urlParams.get('sortBy'), urlParams.get('sortOrder'))
    : visiblePeople;

  return (
    <>
      <Switch>
        <Route
          path="/people/new"
          exact
          render={() => (
            <NewPerson
              addPerson={addPerson}
              peopleList={people}
              updateChildren={updateChildren}
              match={match}
              history={history}
              location={location}
            />
          )}
        />
        <Route path="/people/:personName?" exact>
          <NavLink to="/people/new" className="people__link">add</NavLink>
        </Route>
      </Switch>
      <h3>
        Currently visible people:
        {' '}
        {visiblePeople
          .length}
      </h3>
      <DebounceInput
        debounceTimeout={500}
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
                      onClick={() => handleSortClick(title)}
                    >
                      {title.toUpperCase()}
                    </th>
                  );
              }
            })}
          </tr>
        </thead>
        <tbody>
          {visiblePeople
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
