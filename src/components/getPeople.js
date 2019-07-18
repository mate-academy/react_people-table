const url = 'https://mate-academy.github.io/react_people-table/api/people.json';

const getPeople = async () => {
  const responce = await fetch(url);
  return await responce.json();
};

export default getPeople;
