import React, { useState } from 'react';
import people from './people';
import PeopleTable from './PeopleTable';

const preparedPeople = people.map(
  (person, index) => ({
    ...person,
    id: index,
    centure: Math.ceil(person.died / 100),
    age: person.died - person.born,
    mother: person.mother || '',
    father: person.father || '',
  })
);

const PeoplePage = () => {
  const [inputValue, setFiltered] = useState('');
  const [isSelected, setSelected] = useState(null);
  const [direction, setDirection] = useState('');
  const [sortType, setSortType] = useState('');

  const makeSelected = (id) => {
    setSelected(id);
  };

  let visiblePeople = preparedPeople;

  if (inputValue) {
    const searchQuery = inputValue
      .toLowerCase()
      .trim()
      .replace(/\d/g, '');

    visiblePeople = preparedPeople.filter(
      ({ name, mother, father }) => (
        (name + mother + father).toLowerCase().includes(searchQuery)
      )
    );
  }

  const sortBy = (type) => {
    if (type === sortType) {
      setDirection(direction === 'asc' ? 'desc' : 'asc');
    } else {
      setDirection('asc');
      setSortType(type);
    }
  };

  if (visiblePeople.length !== 0) {
    switch (typeof visiblePeople[0][sortType]) {
      case 'string':
        visiblePeople = [...visiblePeople]
          .sort(
            (a, b) => a[sortType].localeCompare(b[sortType])
          );
        break;

      case 'number':
        visiblePeople = [...visiblePeople]
          .sort((a, b) => b[sortType] - a[sortType]);
        break;

      default:
    }

    if (direction === 'desc') {
      visiblePeople = visiblePeople.reverse();
    }
  }

  return (
    <PeopleTable
      sortBy={sortBy}
      makeSelected={makeSelected}
      visiblePeople={visiblePeople}
      inputValue={inputValue}
      setFiltered={setFiltered}
      isSelected={isSelected}
    />
  );
};

export default PeoplePage;
