// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Person {
  [key: string]: string | number;
}

type PeopleProps = {
  people: Person[];
  handleSort: React.MouseEventHandler;
};
