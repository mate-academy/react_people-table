import { PersonTable } from './interfaces/interfaces';

export const getListOfPeople = <T>(): Promise<T[]> => (
  fetch('https://mate-academy.github.io/react_people-table/api/people.json')
    .then(response => response.json())
);

export const getData = async () => {
  const peopleList = await getListOfPeople<PersonTable>();

  return peopleList.map((person: PersonTable, index: number) => ({
    id: index + 1,
    name: person.name,
    sex: person.sex,
    born: person.born,
    died: person.died,
    fatherName: person.fatherName ? person.fatherName : 'none',
    motherName: person.motherName ? person.motherName : 'none',
    slug: person.slug,
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
  }));
};
