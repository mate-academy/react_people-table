const getData = async() => {
  const url = 'https://mate-academy.github.io/react_people-table/api/people.json';
  const responsePeople = await fetch(url);
  const people = await responsePeople.json();

  return people.map((person, index) => ({
    ...person,
    index: index + 1,
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
    motherName: person.mother,
    fatherName: person.father,
    mother: people.find(woman => woman.name === person.mother),
    father: people.find(man => man.name === person.father),
    children: people
      .filter(child => child.father === person.name
        || child.mother === person.name),
  }));
};

export default getData;
