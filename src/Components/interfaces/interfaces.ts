export interface PersonType {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  father?: PersonType | null;
  motherName: string;
  mother?: PersonType | null;
  slug: string;
}
