const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export interface Person {
  id: number;
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
}

const getPeople = (): Promise<Person[]> => {
  return fetch(API_URL)
    .then(response => response.json());
};

export default getPeople;
