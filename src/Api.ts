export const peopleUrl = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const fetchData = async <T>(url: string): Promise<T[]> => {
  const response = await fetch(url);
  const data = response.json();

  return data;
};
