export interface Person {
  id: string;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  name: string;
  sex: string;
  slug: string;
  selected: boolean;
}
