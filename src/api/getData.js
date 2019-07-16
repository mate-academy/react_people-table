const url = 'https://mate-academy.github.io/react_people-table/api/people.json';

const getPeople = async() => fetch(url)
  .then(response => response.json());
const getData = async() => {
  const people = await getPeople();

  return people.map((person, index) => ({
    ...person,
    id: index + 1,
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
    children: people
      .filter(child => child.father === person.name
        || child.mother === person.name)
      .map(p => p.name),
  }));
};

export default getData;
