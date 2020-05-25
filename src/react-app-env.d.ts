// eslint-disable-next-line
/// <reference types="react-scripts" />

interface People {
  [key: string]: string | number | null;
  mother: string;
  father: string;
  name: string;
}

interface HeaderKeys {
  [key: string]: string;
}

interface SortMethods {
  [key: string]: string;
}

interface Match {
  isExact: boolean;
  params: {
    id: string;
  };
  path: string;
  url: string;
}
