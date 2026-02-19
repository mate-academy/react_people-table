import { Person, PersonWithParents } from '../types/Person';

const API_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

export async function getPeople(): Promise<PersonWithParents[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to load people');
  }

  const people: Person[] = await response.json();

  const byName = new Map<string, Person>();

  people.forEach(p => byName.set(p.name, p));

  return people.map(person => ({
    ...person,
    mother: person.motherName ? (byName.get(person.motherName) ?? null) : null,
    father: person.fatherName ? (byName.get(person.fatherName) ?? null) : null,
  }));
}
