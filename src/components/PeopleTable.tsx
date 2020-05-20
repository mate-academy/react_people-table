import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import { THead } from './THead';
import { TBody } from './TBody';

interface Props {
  people: People[];
  sortBy: (sortParam: string, sortType: string) => void;
}

export const PeopleTable: React.FC<Props> = ({ people, sortBy }) => {
  const [selectedPerson, setSelectedPerson] = useState(0);
  let keysForHeader: string[] = [];
  const match: Match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (match.params.id && people.length) {
      const findId = people
        .find(pers => pers.name.toLowerCase().replace(/ /g, '-') === match.params.id);

      if (findId) {
        setSelectedPerson(findId.id as number);
      }
    }
  }, [people]);

  const selectPerson = (id: number) => {
    setSelectedPerson(id);
  };

  useEffect(() => {
    const name = people.find(man => man.id === selectedPerson)?.name;

    if (name) {
      const path = `/people/${name.toLowerCase().replace(/ /g, '-')}`;

      history.push({
        pathname: path,
        search: location.search,
      });
    }
  }, [selectedPerson]);

  if (people.length) {
    keysForHeader = Object.keys(people[0]);
  }

  return (
    <>
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
    </>
  );
};
