const UrlPeople = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = (): Promise<any> => {
  return fetch(UrlPeople)
    .then(response => response.json());
};
