import { loadData } from '../api/api';
import { PEOPLE_URL } from '../Constants/constants';
import { PersonType } from '../interfaces/interfaces';

export const getPeople = async (): Promise<PersonType[]> => {
  const loadedPeople = await loadData<PersonType>(PEOPLE_URL);

  const findParent = (sex: string, parentName: string): PersonType | null => {
    return loadedPeople.find(parent => parent.sex === sex && parent.name === parentName) || null;
  };

  const modifiedPeopleList = loadedPeople.map(person => {
    return {
      ...person,
      motherName: person.motherName || '',
      fatherName: person.fatherName || '',
      mother: findParent('f', person.motherName),
      father: findParent('m', person.fatherName),
    };
  });

  return modifiedPeopleList;
};
