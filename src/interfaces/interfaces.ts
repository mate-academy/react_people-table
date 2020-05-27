export interface PersonTable {
  id: number;
  name: string;
  sex: string;
  fatherName: string;
  motherName: string;
  father: object | string;
  mother: object | string;
  born: number;
  died: number;
  slug: string;
  age: number;
  century: number;
}

export interface Person {
  id: number;
  name: string;
  sex: string;
  father: string;
  mother: string;
  born: number;
  died: number;
  slug: string;
  age: number;
  century: number;
}
