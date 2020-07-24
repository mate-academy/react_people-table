import { PeopleListInterface, Person } from '../interfaces';

export const getData = async (): Promise<PeopleListInterface[]> => {
  const data: Person[] = await fetch('https://mate-academy.github.io/react_people-table/api/people.json').then(respond => respond.json());

  return data.map(person => ({
    ...person,
    mother: data.find(individual => individual.name === person.motherName) as Person,
    father: data.find(individual => individual.name === person.fatherName) as Person,
  }));
};
