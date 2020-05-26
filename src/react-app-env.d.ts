interface PersonFromServer {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
}
interface Person {
  id: number;
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  father?: PersonFromServer;
  mother?: PersonFromServer;
  slug: string;
}
