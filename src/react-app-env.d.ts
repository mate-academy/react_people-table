interface Person {
  slug: string;
  name: string;
  sex: string;
  born: number;
  died: number;
  motherName: string;
  fatherName: string;
}
interface PersonCompleted extends Person{
  father?: Person;
  mother?: Person;
}

interface MatchParams {
  personName: string;
}
