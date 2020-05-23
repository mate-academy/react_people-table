const getPeople = () => {
  return fetch('https://mate-academy.github.io/react_people-table/api/people.json')
    .then(response => response.json());
};

export const getData = async (): Promise<PeopleTable[]> => {
  const people = await getPeople();


  return people.map((person: PeopleTable, index: number) => ({
    ...person,
    id: index + 1,
    father: person.fatherName ? person.fatherName : 'unknown',
    mother: person.motherName ? person.motherName : 'unknown',
    born: person.born,
    died: person.died,
    age: person.died - person.born,
    sex: person.sex,
    century: Math.ceil(person.died / 100),
    slug: person.slug,
  }));
};
