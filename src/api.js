const PEOPLE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async () => {
  const response = await fetch(PEOPLE_URL);

  return response.json();
};
