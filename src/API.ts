const PEOPLE_API = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const peopleFromServer = fetch(PEOPLE_API).then((response): Promise<Person[]> => (
  response.json()
));
