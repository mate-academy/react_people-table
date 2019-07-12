const getData = async() => {
  const url = 'https://mate-academy.github.io/react_people-table/api/people.json';
  const responsePeople = await fetch(url);
  const people = await responsePeople.json();

  const data = people.map((person, index) => ({
    ...person,
    index: index + 1,
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
    children: people
      .filter(child => child.father === person.name
        || child.mother === person.name)
      .map(human => human.name),
  }));

  return data;
};

export default getData;
