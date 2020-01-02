const URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeopleFromServer = async() => {
  const response = await fetch(URL);

  return response.json();
};
