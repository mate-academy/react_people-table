const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = (): Promise<Person[]> => {
  return fetch(API_URL)
    .then(responce => responce.json());
};

export const TABLE_TITLES = [
  'Id',
  'Name',
  'Sex',
  'Born',
  'Died',
  'Mother',
  'Father',
];
