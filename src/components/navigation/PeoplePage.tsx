import React from 'react';
import { PeopleTable } from '../PeopleTable';
import { usePeoplePage } from '../hooks/usePeoplePage';


export const PeoplePage = () => {
  const {
    inputValue,
    searchPeople,
    searchedPeople,
    handleSort,
  } = usePeoplePage();

  return (
    <div className="container">
      <input
        type="text"
        value={inputValue}
        placeholder="Type something to search people..."
        onChange={searchPeople}
      />
      <PeopleTable people={searchedPeople} handleSort={handleSort} />
    </div>
  );
};
