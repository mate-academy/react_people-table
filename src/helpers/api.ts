const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
}

export interface ModifiedPerson extends Person {
  father?: Person;
  mother?: Person;
}

export const getPeople = <Person>(): Promise<Person[]> => {
  return fetch(API_URL).then(response => response.json())
}
