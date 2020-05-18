import React, { useState } from 'react';
import { THead } from './THead';
import { TBody } from './TBody';

interface Props {
  people: People[];
  sortBy: (sortParam: string, sortType: string) => void;
}

export const PeopleTable: React.FC<Props> = ({ people, sortBy }) => {
  const [selectedPerson, setSelectedPerson] = useState<People[]>([]);
  let keysForHeader: string[] = [];

  const selectPerson = (id: number) => {
    const serchedPerson = people.find(person => person.id === id);

    if (serchedPerson) {
      setSelectedPerson([serchedPerson]);
    }
  };

  if (people.length) {
    keysForHeader = Object.keys(people[0]);
  }

  return (
    <table className="PeopleTable table">
      <THead
        keysForHeader={keysForHeader}
        sortBy={sortBy}
      />
      <TBody
        selectedPerson={selectedPerson}
        selectPerson={selectPerson}
        keysForHeader={keysForHeader}
        people={people}
      />
    </table>
  );
};
