interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
}

interface PreparedPerson {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName?: Person;
  motherName?: Person;
  slug: string;
}
