// eslint-disable-next-line
/// <reference types="react-scripts" />
interface Person {
  [key: string]: T;
  name: string;
  sex: string;
  age: number;
  born: number;
  died: number;
  century: number;
  fatherName: string;
  motherName: string;
  children: string;
  slug: string;
  id: number;
}

interface HeadersConfig {
  id: string;
  name: string;
  sex: string;
  age: string;
  born: string;
  died: string;
  century: string;
  father: string;
  mother: string;
  children: string;
}

interface TableHeader {
  code: string;
  name: string;
}

type Param = {
  [key: string]: string;
};
