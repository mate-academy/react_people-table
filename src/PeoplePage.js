import React, { useState, useEffect } from 'react';
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
  const { match, history, location } = props;
  const params = new URLSearchParams(location.search);
  const query = params.get('query');
  const [inputValue, setFiltered] = useState(query);
  const [isSelected, setSelected] = useState(-1);

  useEffect(() => {
    setFiltered(query);
  }, [query]);

  let visiblePeople = preparedPeople;

  const makeSelected = (selectedId) => {
    if (
      preparedPeople.find(person => person.id === selectedId)
    ) {
      setSelected(selectedId);
      let { name } = preparedPeople.find(person => person.id === selectedId);

      name = name.toLowerCase().replace(/ /g, '-');
      history.push({
        pathname: `${match.path}/${name}`,
        search: params.toString(),
      });
    }
  };

  const pathNameOfPeople = location.pathname.split('/').slice(2).join('');

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

    if (type === params.get('sortBy')) {
      params.set('sortOrder', (
        params.get('sortOrder') === 'asc' ? 'desc' : 'asc'));
    } else {
      params.set('sortOrder', (
        params.get('sortOrder') === 'asc' ? 'desc' : 'asc'));
    }

    history.push({
      search: params.toString(),
    });
  };

  const sortByFromSearchParams = params.get('sortBy');

  if (visiblePeople.length !== 0) {
    switch (typeof visiblePeople[0][sortByFromSearchParams]) {
      case 'string':
        visiblePeople = [...visiblePeople]
          .sort(
            (a, b) => a[sortByFromSearchParams].localeCompare(
              b[sortByFromSearchParams]
            )
          );
        break;

      case 'number':
        visiblePeople = [...visiblePeople]
          .sort(
            (a, b) => b[sortByFromSearchParams] - a[sortByFromSearchParams]
          );
        break;

      default:
    }

    if (params.get('sortOrder') === 'asc') {
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
      pathNameOfPeople={pathNameOfPeople}
    />
  );
};

PeoplePage.propTypes = {
  match: propTypes.objectOf(propTypes.any).isRequired,
  history: propTypes.objectOf(propTypes.any).isRequired,
  location: propTypes.objectOf(propTypes.any).isRequired,
};

export default PeoplePage;
