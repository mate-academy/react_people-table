// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Person {
  id: number;
  born: number;
  died: number;
  age: number;
  century: number;
  name: string;
  sex: string;
  mother: string;
  father: string;
  children: string;
}

type PeopleProps = {
  people: Person[];
  handleSort: (th: string) => void;
};
