interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
}

interface PersonWithId extends Person {
  id: number;
  father?: Person;
  mother?: Person;
}
