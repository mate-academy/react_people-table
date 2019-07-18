const baseUrl = 'https://mate-academy.github.io';

const getPeople = async() => {
  const url = '/react_people-table/api/people.json';
  const response = await fetch(`${baseUrl}${url}`);
  const people = await response.json();

  return people;
};

export default getPeople;
