import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getPeople } from '../../api/data';

import debounce from '../../helpers/debounce';
import { isString, isNumber } from '../../helpers/isType';


export const usePeoplePage = () => {
  const history = useHistory();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const query = search.get('query') || '';
  const sortedBy: keyof Person | null = search.get('sortBy') as keyof Person;
  const sortOrder = search.get('sortOrder');

  const [people, setPeople] = useState([]);
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    const fetchPreparedPeople = async () => {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer.map((person: Person, i: number) => ({
        ...person,
        id: i + 1,
        age: person.died - (person.born),
        century: Math.ceil(person.died / 100),
        mother: person.mother ? person.mother : '----',
        father: person.father ? person.father : '----',
        children: peopleFromServer
          .filter((child: Person) => child.father === person.name || child.mother === person.name)
          .map((child: Person) => child.name)
          .join(', ') || '----',
      })));
    };

    fetchPreparedPeople();
  }, []);

  const historyPush = debounce(() => {
    history.push({ search: search.toString() });
  }, 500);

  const searchPeople = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();

      search.set('query', value.toLowerCase());

      if (!(search.get('query') || '').trim()) {
        search.delete('query');
      }

      setInputValue(value);
      historyPush();
    }, [search, historyPush],
  );

  let searchedPeople: Person[] = useMemo(() => {
    return people.filter(({ name, mother, father }: Person) => (
      name + mother + father
    ).toLowerCase().includes(query));
  }, [people, query]);

  searchedPeople = useMemo(() => {
    const sortedArr = [...searchedPeople].sort((a, b) => {
      const valueA = a[sortedBy];
      const valueB = b[sortedBy];

      if (isString(valueA) && isString(valueB)) {
        if (sortOrder === 'desc') {
          return (valueB).localeCompare(valueA);
        }

        return (valueA).localeCompare(valueB);
      }

      if (isNumber(valueA) && isNumber(valueB)) {
        if (sortOrder === 'desc') {
          return valueB - valueA;
        }

        return valueA - valueB;
      }

      return 0;
    });

    return sortedArr;
  },
  [searchedPeople, sortOrder, sortedBy]);

  const handleSort = useCallback(th => {
    const thead = th.toLowerCase();

    if (sortedBy !== thead) {
      search.set('sortBy', thead);
      search.set('sortOrder', 'asc');
    } else {
      search.set('sortOrder',
        sortOrder === 'asc' ? 'desc' : 'asc');
    }

    history.push({ search: search.toString() });
  }, [history, search, sortOrder, sortedBy]);

  return {
    inputValue,
    searchPeople,
    searchedPeople,
    handleSort,
  };
};
