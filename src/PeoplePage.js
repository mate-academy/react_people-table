import React, { useState } from 'react';
import propTypes from 'prop-types';
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

const PeoplePage = (props) => {
  const [inputValue, setFiltered] = useState('');
  const [isSelected, setSelected] = useState(null);
  const [direction, setDirection] = useState('');
  const [sortType, setSortType] = useState('');
  const { match } = props;
  const { history } = props;
  const { location } = props;
  const params = new URLSearchParams(location.search);

  const makeSelected = (selectedId) => {
    if (
      preparedPeople.find(person => person.id === selectedId)
    ) {
      setSelected(selectedId);
      let { name } = preparedPeople.find(person => person.id === selectedId);

      name = name.toLowerCase().replace(/ /g, '-');
      history.push({
        pathname: `${match.path}/${name}`,
      });
    }
  };

  let visiblePeople = preparedPeople;

  const handleInputChange = (value) => {
    const searchQuery = value
      .toLowerCase()
      .trim()
      .replace(/\d/g, '');

    setFiltered(searchQuery);

    params.set('query', searchQuery);
    if (!searchQuery) {
      params.delete('query');
    }

    history.push({ search: `${params.toString()}` });
  };

  if (inputValue) {
    visiblePeople = preparedPeople.filter(
      ({ name, mother, father }) => (
        (name + mother + father).toLowerCase().includes(inputValue)
      )
    );
  }

  const sortBy = (type) => {
    params.set('sortBy', type);

    if (type === sortType) {
      setDirection(direction === 'asc' ? 'desc' : 'asc');
      params.set('sortOrder', direction);
      history.push({
        search: params.toString(),
      });
    } else {
      setDirection('asc');
      setSortType(type);
      params.set('sortOrder', direction);
      history.push({
        search: params.toString(),
      });
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
      handleInputChange={handleInputChange}
      sortBy={sortBy}
      makeSelected={makeSelected}
      visiblePeople={visiblePeople}
      inputValue={inputValue}
      setFiltered={setFiltered}
      isSelected={isSelected}
    />
  );
};

PeoplePage.propTypes = {
  match: propTypes.objectOf(propTypes.any).isRequired,
  history: propTypes.objectOf(propTypes.any).isRequired,
  location: propTypes.objectOf(propTypes.any).isRequired,
};

export default PeoplePage;
