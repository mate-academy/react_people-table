const API_PEOPLE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

const getPeople = () => {
  return fetch(API_PEOPLE_URL)
    .then(response => response.json());
};

export const getPreparedPeople = async () => {
  const peopleFromServer = await getPeople();

  return peopleFromServer.map((person: Person, index: number) => ({
    ...person,
    id: index + 1,
    father: person.fatherName ? person.fatherName : '',
    mother: person.motherName ? person.motherName : '',
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
  }));
};
