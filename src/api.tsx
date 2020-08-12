import { Person, PersonWithParents } from './components/types';

const URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getData = (): Promise<Person[]> => {
  return fetch(URL).then(response => response.json());
};

export const loadPeople = async (): Promise<PersonWithParents[]> => {
  const people = await getData();

  return (
    people.map((person) => (
      {
        ...person,
        father: people.find(father => person.fatherName === father.name),
        mother: people.find(mother => person.motherName === mother.name),
      }
    ))
  );
};
