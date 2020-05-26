// eslint-disable-next-line
/// <reference types="react-scripts" />

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
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  father?: PersonFromServer;
  mother?: PersonFromServer;
  slug: string;
}
