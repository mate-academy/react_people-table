import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import cn from 'classnames';
import { Link, useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';
import getPeople from '../helpers/api';

type Props = {
  currentPerson: string;
};

const PeopleTable: React.FC<Props> = ({ currentPerson }) => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(res => setPeople(
        res.map((person, i) => ({
          ...person,
          id: i + 1,
        })),
      ));
  }, []);

  const tableHeads = [
    'Name',
    'Sex',
    'Born',
    'Died',
    'Mother',
    'Father',
  ];

  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('query') || '';
  const [currentQuery, setCurrentQuery] = useState(search);

  const updateQuery = useCallback(
    debounce((value: string) => {
      history.push({ search: value });
    }, 1000),
    [],
  );

  const visiblePeople = useMemo(() => {
    return people.filter(person => (
      (person.name + person.fatherName + person.motherName)
        .toLowerCase().includes(search.toLowerCase())
    ));
  }, [people, search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setCurrentQuery(value);
    searchParams.set('query', value);

    if (!(searchParams.get('query') || '').trim()) {
      searchParams.delete('query');
    }

    updateQuery(searchParams.toString());
  };

  useEffect(() => {
    setCurrentQuery(search);
  }, [search]);

  const sortBy = searchParams.get('sortBy') || '';
  const [sortedPeople, setSortedPeople] = useState<Person[]>([...people]);

  useEffect(() => {
    setSortedPeople([...visiblePeople]);
  }, [visiblePeople]);

  useMemo(() => {
    switch (sortBy) {
      case 'id':
      case 'died':
      case 'born':
        sortedPeople.sort((a, b) => (a[sortBy] - b[sortBy]));
        break;
      case 'name':
      case 'sex':
      case 'fatherName':
      case 'motherName':
        sortedPeople.sort((a, b) => (a[sortBy].localeCompare(b[sortBy])));
        break;
      default:
        break;
    }
  }, [sortedPeople, sortBy]);

  const clickHandler = (item: string) => {
    if (searchParams.get('sortBy') === item
      && searchParams.get('sortOrder') === 'asc') {
      searchParams.set('sortOrder', 'desc');
      sortedPeople.reverse();
    } else {
      searchParams.set('sortOrder', 'asc');
      sortedPeople.reverse();
    }

    searchParams.set('sortBy', item);

    history.push({
      search: searchParams.toString(),
    });
  };

  const handleChangePath = (e: string) => {
    history.push({
      pathname: `/people/${e}`,
      search: searchParams.toString(),
    });
  };

  return (
    <div className="page">
      <h2 className="page__title">
        People page
      </h2>
      <input
        type="text"
        value={currentQuery}
        placeholder="Type to search people"
        onChange={handleChange}
        className="searh-input"
      />
      <table className="people-table">
        <thead className="people-table__prop">
          <tr>
            {tableHeads.map(item => (
              <th
                className="people-table__prop"
                key={item}
                onClick={() => clickHandler(item)}
              >
                {item}
                {sortBy === item && '*'}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="people-table__prop">
          {sortedPeople.map(person => (
            <tr
              key={person.id}
              onClick={() => handleChangePath(person.slug)}
            >
              <td className="people-table__prop">
                <Link
                  className={cn({
                    person: true,
                    person__active: currentPerson === person.slug,
                  })}
                  to={`/people/${person.slug}`}
                >
                  {person.name}
                </Link>
              </td>
              <td
                className={cn({
                  person__woman: person.sex === 'f',
                  person__man: person.sex === 'm',
                })}
              >
                {person.sex}
              </td>
              <td className="people-table__prop">
                {person.born}
              </td>
              <td className="people-table__prop">
                {person.died}
              </td>
              <td className="people-table__prop">
                <Link
                  to={`/people/:${person.slug}`}
                  className="person"
                >
                  {person.motherName}
                </Link>
              </td>
              <td className="people-table__prop">
                <Link
                  to={`/people/:${person.slug}`}
                  className="person"
                >
                  {person.fatherName}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeopleTable;
