import classNames from 'classnames';
import { PersonWithParents } from '../../types/Person';
import { PersonName } from './PersonName';

type Props = {
  person: PersonWithParents;
  isSelected: boolean;
};

export const PersonRow: React.FC<Props> = ({ person, isSelected }) => (
  <tr className={classNames('Person', { 'is-selected': isSelected })}>
    <td>
      <PersonName person={person} />
    </td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>

    <td>
      {person.mother ? (
        <PersonName person={person.mother} />
      ) : (
        <PersonName person={null} nameFallback={person.motherName ?? ''} />
      )}
    </td>

    <td>
      {person.father ? (
        <PersonName person={person.father} />
      ) : (
        <PersonName person={null} nameFallback={person.fatherName ?? ''} />
      )}
    </td>
  </tr>
);
