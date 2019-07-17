// eslint-disable-next-line
const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

const getPeople = async() => {
  const response = await fetch(API_URL);
  const people = await response.json();
  return people.map((person, index) => ({
    id: index + 1,
    ...person,
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
    children: people
      .filter(child => (child.father === person.name)
        || (child.mother === person.name)),
  }
  ));
};

export default getPeople;
