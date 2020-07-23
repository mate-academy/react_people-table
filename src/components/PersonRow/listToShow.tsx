import { PeopleListInterface } from '../../interfaces';

export function filterList(people: PeopleListInterface[], query: string) {
  const pattern = new RegExp(`${query}`, 'gi');

  return query
    ? people.filter(person => pattern.test(person.name) || pattern.test(person.motherName)
       || pattern.test(person.fatherName))
    : people;
}

export function sortList(list: PeopleListInterface[], querySort: string) {
  const querySortAdopted = querySort.toLowerCase();

  switch (querySortAdopted) {
    case 'name':
    case 'sex':
      return list
        .sort(
          (personA, personB) => personA[querySortAdopted].localeCompare(personB[querySortAdopted]),
        );
    case 'born':
    case 'died':
      return list
        .sort(
          (personA, personB) => Number(personA[querySortAdopted])
            - Number(personB[querySortAdopted]),
        );
    default:
      return list;
  }
}

export function makeReverse(sortedList: PeopleListInterface[], querySortOrder: string) {
  if (querySortOrder === 'asc') {
    return sortedList.reverse();
  }

  return sortedList;
}
