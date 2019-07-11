const getData = () => {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = (
    'https://mate-academy.github.io/react_people-table/api/people.json'
  );

  return fetch(proxyUrl + targetUrl)
    .then(response => response.json());
};

export default getData;
