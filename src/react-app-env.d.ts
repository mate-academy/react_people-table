// eslint-disable-next-line
// <reference types="react-scripts" />

interface PersonFromServer {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
}

interface Person {
  id?: number;
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  mother?: PersonFromServer | string;
  father?: PersonFromServer | string;
  slug: string;
}
