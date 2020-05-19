import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getPeople } from '../../api/data';
import debounce from '../../helpers/debounce';

export const usePeoplePage = () => {
  const history = useHistory();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const query = search.get('query') || '';
  const sortedBy = search.get('sortBy');
  const sortOrder = search.get('sortOrder');

  const [people, setPeople] = useState([]);
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    const fetchPreparedPeople = async () => {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer.map((person: Person, i: number) => ({
        ...person,
        id: i + 1,
        age: person.died as number - (person.born as number),
        century: Math.ceil(person.died as number / 100),
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
      name as string + mother as string + father
    ).toLowerCase().includes(query));
  }, [people, query]);

  const sortPeople = (arr: Person[], thead: string, order: string | null) => {
    const sortedArr = [...arr].sort((a, b) => (
      typeof a[thead] === 'string'
        ? (a[thead] as string).localeCompare(b[thead] as string)
        : (a[thead] as number) - (b[thead] as number)
    ));

    return order === 'desc' ? sortedArr.reverse() : sortedArr;
  };

  searchedPeople = useMemo(() => sortPeople([...searchedPeople], sortedBy as string, sortOrder),
    [searchedPeople, sortOrder, sortedBy]);

  const handleSort = useCallback((event: React.MouseEvent<HTMLTableHeaderCellElement>) => {
    const thead = (event.target as HTMLElement).textContent as keyof Person;
    const theadLowerCased = (thead as string).toLowerCase();

    if (sortedBy !== theadLowerCased) {
      search.set('sortBy', theadLowerCased);
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
