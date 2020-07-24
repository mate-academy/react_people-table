import { PersonType } from '../interfaces/interfaces';

export const sortPatterns: SortPatternsType[] = [
  {
    sortBy: 'name',
    pattern: (personA, personB) => {
      return personA.name.localeCompare(personB.name);
    },
  },
  {
    sortBy: 'sex',
    pattern: (personA, personB) => {
      return personA.sex.localeCompare(personB.sex);
    },
  },
  {
    sortBy: 'born',
    pattern: (personA, personB) => {
      return personA.born - personB.born;
    },
  },
  {
    sortBy: 'died',
    pattern: (personA, personB) => {
      return personA.died - personB.died;
    },
  },
];

interface SortPatternsCallBack {
  (personA: PersonType, personB: PersonType): number;
}

interface SortPatternsType {
  sortBy: string;
  pattern: SortPatternsCallBack;
}
