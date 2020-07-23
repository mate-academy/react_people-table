import { PeopleListInterface } from '../../interfaces';

export function filterList(people: PeopleListInterface[], query: string) {
  const pattern = new RegExp(`${query}`, 'gi');

  return query
    ? people.filter(person => pattern.test(person.name) || pattern.test(person.motherName)
       || pattern.test(person.fatherName))
    : people;
}

export function sortList(list: PeopleListInterface[], querySort: string, querySortOrder: string) {
  switch (querySort) {
    case 'Name':
      return list
        .sort((personA, personB) => {
          return querySortOrder === 'asc'
            ? personA.name.localeCompare(personB.name)
            : personB.name.localeCompare(personA.name);
        });
    case 'Sex':
      return list
        .sort((personA, personB) => {
          return querySortOrder === 'asc'
            ? personA.sex.localeCompare(personB.sex)
            : personB.sex.localeCompare(personA.sex);
        });
    case 'Born':
      return list
        .sort((personA, personB) => {
          return querySortOrder === 'asc'
            ? Number(personA.born) - Number(personB.born)
            : Number(personB.born) - Number(personA.born);
        });
    case 'Died':
      return list
        .sort((personA, personB) => {
          return querySortOrder === 'asc'
            ? Number(personA.born) - Number(personB.died)
            : Number(personB.born) - Number(personA.died);
        });
    default:
      return list;
  }
}
