import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PeopleTable from './PeopleTable';

const url = 'https://mate-academy.github.io/react_people-table/api/people.json';

const Main = () => {
  const [peopleAmount, setPeopleAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState([]);
  const [peopleList, setPeopleList] = useState([]);
  const [query, setQuery] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const sortTags = ['name', 'id', 'sex', 'born', 'died', 'age', 'century'];
  const nameFromUrl = searchParams.get('query');
  const sortByFromUrl = searchParams.get('sortBy');

  if (nameFromUrl && nameFromUrl !== query) {
    setQuery(nameFromUrl);
    findPerson(nameFromUrl);
  }

  if (sortByFromUrl && sortByFromUrl !== sortBy) {
    setSortBy(sortByFromUrl);
    sort(sortByFromUrl);
  }

  if (isLoading) {
    fetch(url).then(listOfPeople => listOfPeople.json())
      .then((list) => {
        setPeopleAmount(list.length);
        setPeople(list.map((person, index) => ({
          ...person,
          id: index,
        })));
        setPeopleList(list.map((person, index) => ({
          ...person,
          id: index,
        })));
        setIsLoading(false);
      });
  }

  const debounce = (f, delay) => {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        f(...args);
      }, delay);
    };
  };

  function findPerson(name) {
    const filteredPeople = people.filter((person) => {
      const mother = person.mother === null ? '' : person.mother;
      const father = person.father === null ? '' : person.father;

      return (
        mother.toLowerCase().includes(name.toLowerCase())
        || person.name.toLowerCase().includes(name.toLowerCase())
        || father.toLowerCase().includes(name.toLowerCase())
      );
    });

    setPeopleList(filteredPeople);
    setPeopleAmount(filteredPeople.length);

    if (name.length > 0) {
      searchParams.set('query', name);
      history.push({ search: searchParams.toString() });
    } else {
      history.push({ search: null });
    }
  }

  const inputText = debounce(findPerson, 1000);

  function sort(e) {
    let sortedPeople = [];
    const sortName = typeof (e) === 'string' ? e : e.target.value;
    const previousOrder = [...peopleList];

    switch (sortName) {
      case 'name':
        sortedPeople = [
          ...peopleList.sort((person1, person2) => (
            person1.name.localeCompare(person2.name))),
        ];

        searchParams.set('sortBy', 'name');
        break;

      case 'id':
        sortedPeople = [
          ...peopleList.sort((person1, person2) => (
            person1.id - person2.id)),
        ];

        searchParams.set('sortBy', 'id');
        break;

      case 'sex':
        sortedPeople = [
          ...peopleList.sort((person1, person2) => (
            person1.sex.localeCompare(person2.sex))),
        ];

        searchParams.set('sortBy', 'sex');
        break;

      case 'born':
        sortedPeople = [
          ...peopleList.sort((person1, person2) => (
            person1.born - person2.born)),
        ];

        searchParams.set('sortBy', 'born');
        break;

      case 'died':
        sortedPeople = [
          ...peopleList.sort((person1, person2) => (
            person1.died - person2.died)),
        ];

        searchParams.set('sortBy', 'died');
        break;

      case 'age':
        sortedPeople = [
          ...peopleList.sort((person1, person2) => (
            person1.died - person1.born) - (person2.died - person2.born)),
        ];

        searchParams.set('sortBy', 'age');
        break;

      case 'century':
        sortedPeople = [
          ...peopleList.sort((person1, person2) => (
            (Math.ceil(person1.died / 100)))
              - ((Math.ceil(person2.died / 100)))),
        ];

        searchParams.set('sortBy', 'century');
        break;

      default:
        break;
    }

    if (JSON.stringify(sortedPeople)
    === JSON.stringify(previousOrder)) {
      sortedPeople.reverse();
    }

    setPeopleList(sortedPeople);
    history.push({ search: searchParams.toString() });
  }

  return (
    <div className="App">
      <h1 className="people__h1">
        {
          isLoading ? '...Loading' : `${peopleAmount} persons found`
        }
      </h1>
      {
        isLoading
          ? ''
          : (
            <div className="people__forms">
              <nav>
                <input
                  type="text"
                  name="search"
                  placeholder="find"
                  onChange={(e) => {
                    inputText(e.target.value);
                  }}
                />
                {
                  sortTags.map(tagName => (
                    <button
                      type="button"
                      onClick={sort}
                      className="sort__button"
                      value={tagName}
                      key={tagName}
                    >
                      sort by
                      {' '}
                      {tagName}
                    </button>
                  ))
                }
              </nav>
              <PeopleTable
                peopleList={peopleList}
              />
            </div>
          )
      }
    </div>
  );
};

export default Main;
