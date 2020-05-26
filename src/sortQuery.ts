export const sortQuery = {
  id: 'id',
  name: 'name',
  sex: 'sex',
  born: 'born',
  died: 'died',
  age: 'age',
  century: 'century',
  motherName: 'motherName',
  fatherName: 'fatherName',
};

export const tHead: string[] = [
  'id',
  'name',
  'sex',
  'born',
  'died',
  'age',
  'century',
  'motherName',
  'fatherName',
];

export const checkQuery = (query: keyof PersonWithId): string => {
  if (tHead.includes(`${query}`)) {
    return query;
  }

  throw new TypeError('wrong query');
};
