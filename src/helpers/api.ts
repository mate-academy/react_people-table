import axios from 'axios';

const URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = () => {
  return axios.get(URL);
};
