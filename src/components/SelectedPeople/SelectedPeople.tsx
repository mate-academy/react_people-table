import React from 'react';
import { Person } from '../../types/Person';

type Props = {
  people: Person[];
  clearSelectedPeople: () => void;
};

export const SelectedPeople: React.FC<Props> = ({
  people,
  clearSelectedPeople,
}) => {
  const selectedPeople = people.filter(person => person.selected);

  if (selectedPeople.length === 0) {
    return (
      <p>
        No selected people
      </p>
    );
  }

  return (
    <article className="title is-5 has-text-info">
      <button
        aria-label="Remove"
        type="button"
        className="delete"
        onClick={clearSelectedPeople}
      />

      <ul>
        {selectedPeople.map(person => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </article>
  );
};
