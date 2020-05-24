const BASE_URL = 'https://andreas-just.github.io/library-json';
const API_URL = '/people/people-slug.json';

export const getData = async (url: string) => {
  const response = await fetch(url);

  return response.json();
};

export const getTabs = async (): Promise<Person[]> => {
  const people = await getData(`${BASE_URL}${API_URL}`);

  return people.map((person: Person, idx: number) => ({
    ...person,
    id: idx + 1,
    father: person.fatherName || '',
    mother: person.motherName || '',
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
    children: people
      .filter((child: Person) => (
        child.fatherName === person.name || child.motherName === person.name
      ))
      .map((child: Person) => child.name)
      .join(', ') || '',
  }));
};
