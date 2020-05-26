import React, { useState } from 'react';

export const FavoritesPage = () => {
  const [ favorites ] = useState<Person[]>([]);

  return (
    <ul>
      {favorites.map(({ name, slug }) => (
        <li key={slug}>{name}</li>
      ))}
    </ul>
  );
};
