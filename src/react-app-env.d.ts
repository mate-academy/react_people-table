// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Person {
  id: number;
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
  mother?: Person;
  father?: Person;
}
