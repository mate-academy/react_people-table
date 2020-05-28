const API_PEOPLE = 'https://mate-academy.github.io/react_people-table/api/people.json';

export interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  id?: number;
  slug: string;
}

export const getPeople = (): Promise<Person[]> => {
  return fetch(API_PEOPLE)
    .then(res => res.json());
};
