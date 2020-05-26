import React, { useState, useEffect } from 'react';
import { Person, getPeople } from '../../helpers/api';


const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const getPeopleFromServer = async () => {
      const peopleFromServer = await getPeople<Person>();

      const modifiedPeople = peopleFromServer.map((person: Person) => ({
        ...person,
        father: peopleFromServer.find((father: Person) =>
          father.name === person.fatherName) || person.fatherName,
        mother: peopleFromServer.find((mother: Person) =>
          mother.name === person.motherName) || person.motherName,
      }));

      setPeople(modifiedPeople);
    }

    getPeopleFromServer();
  }, []);

  return (
    <>
      {people.map(person => (
        <p>{person.name}</p>
      ))}
    </>
  )
}

export default PeoplePage;
