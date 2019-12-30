export const getDataFromServer = async(url) => {
  const response = await fetch(url);

  return response.json();
};
