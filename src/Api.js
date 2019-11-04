const link = '/api/people.json';

export const getPeopleData = async () => {
  const response = await fetch(link);

  return response.json();
}
