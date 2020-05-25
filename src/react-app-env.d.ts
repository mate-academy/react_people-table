// eslint-disable-next-line
/// <reference types="react-scripts" />

interface PersonType {
  id: number;
  name: string;
  sex: string;
  born: number;
  died: number;
  motherName: string;
  fatherName: string;
  slug: string;
  motherSlug?: string;
  fatherSlug?: string;
}

interface PersonWithParents extends PersonType {
  father?: Person;
  mother?: Person;
}
