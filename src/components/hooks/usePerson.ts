import { useHistory, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

export const usePerson = ({
  id, name, sex, born, died, age, century, father, mother, children,
}: Person) => {
  const history = useHistory();
  const location = useLocation();
  const path = `/people/${(name as string).replace(/\s/g, '-').toLowerCase()}`;

  const onSelect = useCallback(() => {
    history.push({
      pathname: path,
      search: location.search,
    });
  }, [history, location, path]);

  return {
    id,
    name,
    sex,
    born,
    died,
    age,
    century,
    father,
    mother,
    children,
    onSelect,
    path,
    location,
  };
};
