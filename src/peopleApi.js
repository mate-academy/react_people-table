export const getDataFromServer = async(url) => {
  const response = await fetch(url);

  return response.json();
};

export const URL
  = 'https://mate-academy.github.io/react_people-table/api/people.json';
