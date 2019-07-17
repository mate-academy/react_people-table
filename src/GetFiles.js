const url = 'https://mate-academy.github.io/react_people-table/api/people.json';

const getFiles = async() => {
  const response = await fetch(url);
  const people = await response.json();

  const listPeople = people.map((person, index) => ({
    ...person,
    id: index + 1,
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
    children:
    people
      .filter(child => child.father === person.name
      || child.mother === person.name)
      .map(pers => pers.name),
  }));

  return listPeople;
};

export default getFiles;
