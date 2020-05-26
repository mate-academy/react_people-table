const apiUrl = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const peopleFromServer = fetch(apiUrl)
  .then((response): Promise<Person[]> => response.json());
