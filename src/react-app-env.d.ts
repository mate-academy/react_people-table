interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
}

interface SortQuery {
  id: string;
  name: string;
  sex: string;
  born: string;
  died: string;
  age: string;
  century: string;
  mother: string;
  father: string;
}

interface PersonWithId extends Person {
  id: number;
  father?: Person;
  mother?: Person;
  century: number;
  age: number;
}
