export const getData = async () => {
  const response = await fetch('/api/people.json');
  return response.json();
};
