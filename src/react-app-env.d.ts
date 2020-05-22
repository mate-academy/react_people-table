
interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
  0: number;
}

type Match = {
  isExact: boolean;
  params: {
    id: string;
    home: string;
  };
  path: string;
  url: string;
};
