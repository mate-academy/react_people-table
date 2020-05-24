
const getPeople = async ():Promise<Person[]> => {
  const API_URL = 'https://mate-academy.github.io/react_people-table/api';
  const people = await fetch(`${API_URL}/people.json`).then(response => response.json());

  return people;
};

export default getPeople;
