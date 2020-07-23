import { PeopleListInterface } from '../../interfaces';

export function filterList(people: PeopleListInterface[], query: string) {
  const pattern = new RegExp(`${query}`, 'gi');

  return query
    ? people.filter(person => pattern.test(person.name) || pattern.test(person.motherName)
       || pattern.test(person.fatherName))
    : people;
}

export function sortList(list: PeopleListInterface[], querySort: string, querySortOrder: string) {
  const querySortAdopted = querySort.toLowerCase();

  switch (querySortAdopted) {
    case 'name':
    case 'sex':
      return list
        .sort((personA, personB) => {
          return querySortOrder === 'asc'
            ? personA[querySortAdopted].localeCompare(personB[querySortAdopted])
            : personB[querySortAdopted].localeCompare(personA[querySortAdopted]);
        });
    case 'born':
    case 'died':
      return list
        .sort((personA, personB) => {
          return querySortOrder === 'asc'
            ? Number(personA[querySortAdopted]) - Number(personB[querySortAdopted])
            : Number(personB[querySortAdopted]) - Number(personA[querySortAdopted]);
        });
    default:
      return list;
  }
}
