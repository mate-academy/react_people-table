export const API_URL
  = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const fetchPeopleFromServer = () => (
  fetch(API_URL).then(response => response.json()));
