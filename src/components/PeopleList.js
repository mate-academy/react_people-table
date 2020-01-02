import React, { useEffect, useState } from 'react';
import { Table, Container } from 'semantic-ui-react';
import { useHistory, useLocation } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import Person from './Person';

const URL = 'https://mate-academy.github.io/react_people-table/api/people.json';
const TABLE_HEADER = [
  'id',
  'name',
  'sex',
  'born',
  'died',
  'father',
  'mother',
  'age',
  'century',
  'children'];

const PeopleList = () => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);

  const getPeopleFromServer = () => fetch(URL)
    .then(response => response.json());

  const [people, setPeople] = useState([]);
  let [isClicked, setClicked] = useState(false);  // eslint-disable-line
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    getPeopleFromServer().then((peopleFromServer) => {
      setPeople(peopleFromServer);
    });
  }, []);

  const preparedData = people.map((person, index) => ({
    ...person,
    id: index + 1,
    children: people.filter(item => item.father === person.name
      || item.mother === person.name).map(child => child.name) || [],
    father: person.father || '',
    mother: person.mother || '',
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
  }));

  const [selected, setSelected] = useState('');

  const setFilter = (e) => {
    const order = e.target.value;
    const param = e.target.id;

    setSelected(param);
    setClicked((isClicked = !isClicked));
    searchParams.set('SortBy', param);
    searchParams.set('order', order);
    history.push({ search: searchParams.toString() });
  };

  const sortedPeople = () => {
    const selectedSort = searchParams.get('SortBy');
    const selectedOrder = searchParams.get('order');

    if (preparedData[0]) {
      switch (typeof preparedData[0][selectedSort]) {
        case 'number':
          return selectedOrder === 'esc'
            ? [...preparedData]
              .sort((a, b) => a[selectedSort] - b[selectedSort])
            : [...preparedData]
              .sort((a, b) => b[selectedSort] - a[selectedSort]);
        case 'string':
          return selectedOrder === 'esc'
            ? [...preparedData]
              .sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
            : [...preparedData]
              .sort((a, b) => b[selectedSort].localeCompare(a[selectedSort]));
        case 'object':
          return selectedOrder === 'esc'
            ? [...preparedData]
              .sort((a, b) => a[selectedSort]
                .join(',').localeCompare(b[selectedSort].join(',')))
            : [...preparedData]
              .sort((a, b) => b[selectedSort]
                .join(',').localeCompare(a[selectedSort].join(',')));
        default:
          return preparedData;
      }
    }

    return preparedData;
  };

  const SearchQuery = (event) => {
    const searchValue = event.target.value.trim();

    setInputValue(searchValue);
  };

  const renderData = inputValue === ''
    ? sortedPeople()
    : sortedPeople()
      .filter(({ name, father, mother }) => name
        .toLowerCase().includes(inputValue)
        || father.toLowerCase().includes(inputValue)
        || mother.toLowerCase().includes(inputValue));

  return (
    <>
      <Container>

        <DebounceInput
          debounceTimeout={1000}
          onChange={SearchQuery}
          icon="search"
          placeholder="Search..."
        />
      </Container>

      <Table celled inverted selectable>
        <Table.Header>
          <Table.Row>
            {TABLE_HEADER.map(title => (
              <Table.HeaderCell key={title}>
                <label className="HeaderCell" htmlFor={title}>
                  <input
                    type="checkbox"

                    id={title}
                    onChange={e => setFilter(e)}
                    checked={selected === title}
                    value={(!isClicked)
                      ? 'esc'
                      : 'desc'
                    }
                  />

                  <span>
                    {title}
                  </span>
                  <p className={selected === title ? 'selected' : ''}>
                    <i className="material-icons">sort_by_alpha</i>
                  </p>
                </label>

              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        {preparedData && preparedData.length > 0 && renderData.map(person => (
          <Table.Body key={person.name}>

            <Person person={person} />

          </Table.Body>
        ))}

      </Table>
    </>
  );
};

export default PeopleList;
