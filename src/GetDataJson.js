import PropTypes from 'prop-types';

const getDataJson = async(url) => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

getDataJson.propTypes = {
  url: PropTypes.string,
};

export default getDataJson;
