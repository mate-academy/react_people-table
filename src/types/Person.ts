export type Sex = 'm' | 'f';

export interface Person {
  name: string;
  sex: Sex;
  born: number;
  died: number;
  motherName?: string;
  fatherName?: string;
  slug: string;
}

export interface PersonWithParents extends Person {
  mother?: Person | null;
  father?: Person | null;
}
