import React from 'react'

const User = ({ user }) => (
  <tr>
    <td>{user.id}</td>
    {(user.born < 1650)
      ? <td className="line-through">{user.name}</td>
      : (user.died > 1800)
        ? <td className="bold">{user.name}</td>
        : <td>{user.name}</td>
    }
    {(user.sex === 'm')
      ?  <td className="user--male">{user.sex}</td>
      : <td className="user--female">{user.sex}</td>
    }
    <td>{user.born}</td>
    <td>{user.died}</td>
    <td>{user.died - user.born}</td>
    <td>{user.mother}</td>
    <td>{user.father}</td>
  </tr>
);

export default User
