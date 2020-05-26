import { API_URL } from '../constants';

export const getPeople = async (): Promise<PersonFromServer[]> => {
  const response = await fetch(`${API_URL}/people.json`);

  return response.json();
};
