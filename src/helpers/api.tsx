const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async (): Promise<PersonType[]> => {
  const response = await fetch(API_URL);
  const people = await response.json();

  return people;
};
