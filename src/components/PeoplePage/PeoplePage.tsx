import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Person, ModifiedPerson, getPeople } from '../../helpers/api';
import PeopleTable from '../PeopleTable/PeopleTable';
import './PeoplePage.css';


const PeoplePage = () => {
  const [people, setPeople] = useState<ModifiedPerson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const filterQuery = searchParams.get('query') || '';
  const sortQuery = searchParams.get('sortBy') || '';

  useEffect(() => {
    const getPeopleFromServer = async () => {
      setIsLoading(true);

      try {
        const peopleFromServer = await getPeople<Person>();

        const modifiedPeople = peopleFromServer.map((person: Person) => ({
          ...person,
          father: peopleFromServer.find((father: Person) =>
            father.name === person.fatherName),
          mother: peopleFromServer.find((mother: Person) =>
            mother.name === person.motherName),
        }));

        setPeople(modifiedPeople);
      } catch {
        setErrorMessage('Error');
        setIsLoading(false);
      }

      setIsLoading(false);
    }

    getPeopleFromServer();
  }, []);

  const filterPeople = (filterQuery: string, people: ModifiedPerson[]) => (
    people.filter(({ name, motherName, fatherName }) =>
      (name + motherName + fatherName).toLowerCase().includes(filterQuery.toLowerCase())
    )
  );

  const sortPeople = (sortQuery: string, people: ModifiedPerson[]) => {
    switch (sortQuery) {
      case 'name':
        return [...people].sort((currPerson, nextPerson) => (
          currPerson.name.localeCompare(nextPerson.name)
        ));

      case 'sex':
        return [...people].sort((currPerson, nextPerson) => (
          currPerson.sex.localeCompare(nextPerson.sex)
        ));

      case 'born':
        return [...people].sort((currPerson, nextPerson) => (
          currPerson.born - nextPerson.born
        ));

      case 'died':
        return [...people].sort((currPerson, nextPerson) => (
          currPerson.died - nextPerson.died
        ));

      default:
        return people;
    }
  };

  const visiblePeople = useMemo(() => {
    let peopleCopy = [...people];

    peopleCopy = filterPeople(filterQuery, peopleCopy);
    peopleCopy = sortPeople(sortQuery, peopleCopy);

    return peopleCopy;
  },
    [sortQuery, filterQuery, people]);

  return (
    <>
      {isLoading && (
        <p className="people-table__loading-mess">Loading...</p>
      )}
      {!isLoading && (
        <>
          {errorMessage ? (
            <p className="people-table__error-mess">{errorMessage}</p>
          ) : (
              <PeopleTable people={visiblePeople} />
            )}
        </>
      )}
    </>
  )
}

export default PeoplePage;
