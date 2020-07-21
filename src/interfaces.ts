export interface Person {
  name: string;
  sex: string;
  born: string;
  died: string;
  fatherName: string;
  motherName: string;
  slug: string;
}

export interface PeopleListInterface extends Person {
  mother: Person;
  father: Person;
}
