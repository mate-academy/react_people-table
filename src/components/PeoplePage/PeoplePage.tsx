import React, { useState, useEffect } from 'react';
import { Person, ModifiedPerson, getPeople } from '../../helpers/api';
import PeopleTable from '../PeopleTable/PeopleTable';
import './PeoplePage.css';


const PeoplePage = () => {
  const [people, setPeople] = useState<ModifiedPerson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
            <PeopleTable people={people} />
          )}
        </>
      )}
    </>
  )
}

export default PeoplePage;
