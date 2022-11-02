import { Person } from './types/Person';

type Props = {
  person: Person;
  selectPerson: (personSlug: string) => void;
  className?: string;
};

export const PersonFromTable: React.FC<Props> = ({
  person,
  selectPerson,
  className,
}) => (
  <tr className={className}>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>
      <button
        type="button"
        onClick={() => {
          selectPerson(person.slug);
        }}
      >
        Select
      </button>
    </td>
  </tr>
);
