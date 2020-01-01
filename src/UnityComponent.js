import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PeopleTable from './PeopleTable';

const url = 'https://mate-academy.github.io/react_people-table/api/people.json';

const UnityComponent = () => {
  const [peopleAmount, setPeopleAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState([]);
  const [peopleList, setPeopleList] = useState([]);
  const [query, setQuery] = useState(null);

  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const searchParams2 = new URLSearchParams(location.search);

  let nameFromUrl = location.search.toString()
    .match(/(query)=.+(?=\/|\?|:|&|\b)/g);

  if (nameFromUrl) {
    nameFromUrl = nameFromUrl[0].split('=')[1].split('+').join(' ');
  }

  if (nameFromUrl && nameFromUrl !== query) {
    setQuery(nameFromUrl);
    findPerson(nameFromUrl);
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

  const sortByName = () => {
    const sortedPeople = [
      ...peopleList.sort((person1, person2) => (
        person1.name.localeCompare(person2.name))),
    ];

    setPeopleList(sortedPeople);
    searchParams2.set('sortBy', 'name');
    history.push({ search: searchParams2.toString() });
  };

  const sortById = () => {
    const sortedPeople = [
      ...peopleList.sort((person1, person2) => (
        person1.id - person2.id)),
    ];

    setPeopleList(sortedPeople);
    searchParams2.set('sortBy', 'id');
    history.push({ search: searchParams2.toString() });
  };

  const sortBySex = () => {
    const sortedPeople = [
      ...peopleList.sort((person1, person2) => (
        person1.sex.localeCompare(person2.sex))),
    ];

    setPeopleList(sortedPeople);
    searchParams2.set('sortBy', 'sex');
    history.push({ search: searchParams2.toString() });
  };

  const sortByBorn = () => {
    const sortedPeople = [
      ...peopleList.sort((person1, person2) => (
        person1.born - person2.born)),
    ];

    setPeopleList(sortedPeople);
    searchParams2.set('sortBy', 'born');
    history.push({ search: searchParams2.toString() });
  };

  const sortByDied = () => {
    const sortedPeople = [
      ...peopleList.sort((person1, person2) => (
        person1.died - person2.died)),
    ];

    setPeopleList(sortedPeople);
    searchParams2.set('sortBy', 'died');
    history.push({ search: searchParams2.toString() });
  };

  const sortByAge = () => {
    const sortedPeople = [
      ...peopleList.sort((person1, person2) => (
        person1.died - person1.born) - (person2.died - person2.born)),
    ];

    setPeopleList(sortedPeople);
    searchParams2.set('sortBy', 'age');
    history.push({ search: searchParams2.toString() });
  };

  const sortByCentury = () => {
    const sortedPeople = [
      ...peopleList.sort((person1, person2) => (
        (Math.ceil(person1.died / 100)))
          - ((Math.ceil(person2.died / 100)))),
    ];

    setPeopleList(sortedPeople);
    searchParams2.set('sortBy', 'century');
    history.push({ search: searchParams2.toString() });
  };

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
                <button
                  type="button"
                  onClick={sortByName}
                  className="sort__button"
                >
                  sort by name
                </button>
                <button
                  type="button"
                  onClick={sortById}
                  className="sort__button"
                >
                  sort by id
                </button>
                <button
                  type="button"
                  onClick={sortBySex}
                  className="sort__button"
                >
                  sort by sex
                </button>
                <button
                  type="button"
                  onClick={sortByBorn}
                  className="sort__button"
                >
                  sort by born
                </button>
                <button
                  type="button"
                  onClick={sortByDied}
                  className="sort__button"
                >
                  sort by died
                </button>
                <button
                  type="button"
                  onClick={sortByAge}
                  className="sort__button"
                >
                  sort by age
                </button>
                <button
                  type="button"
                  onClick={sortByCentury}
                  className="sort__button"
                >
              sort by century
                </button>
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

export default UnityComponent;
