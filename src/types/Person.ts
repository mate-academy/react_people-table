export interface Person {
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  name: string;
  sex: string;
  slug: string;
}

export enum SortByOption {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  FatherName = 'fatherName',
  MotherName = 'motherName',
}
