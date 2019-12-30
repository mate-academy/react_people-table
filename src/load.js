async function load (url) {
  const response = await fetch(url);
  const users = await response.json();

  return users.map((user, index) => {
    const {name, mother, father} = user
    return {
      ...user,
      age: user.died - user.born,
      century: Math.ceil(user.died / 100),
      id: index,
      name: name === null ? '' : name,
      mother: mother === null ? '' : mother,
      father: father === null ? '' : father,
    }
  })
}

export default load;
