const url = 'https://mate-academy.github.io/react_people-table/api/'
export default async() => {
  const response = await fetch(`${url}people.json`)
  const users = await response.json()
  return users
}
