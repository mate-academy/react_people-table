
const loadPeople = async() => {
  const urlPeople = 'https://mate-academy.github.io/react_people-table/api/people.json';
  const responsePeople = await fetch(urlPeople);
  const people = await responsePeople.json();

  return people;
};

export default loadPeople;
