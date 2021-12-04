import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userID) => {
    setUsers(users.filter((user) => user._id !== userID));
  };

  const renderPhrase = (number) => {
    return number === 1 || number > 4
      ? `${number} человек туcанет с тобой сегодня`
      : `${number} человекa туcанут с тобой сегодня`;
  };

  const provideColor = (color) => {
    let classes = "badge m-1  ";
    classes += `bg-${color}`;
    return classes;
  };

  const renderTable = () => {
    return (
      <>
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>
                {user.qualities.map(({ name, color, _id }) => (
                  <span key={_id} className={provideColor(color)}>
                    {name}
                  </span>
                ))}
              </td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user._id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </>
    );
  };

  return (
    <>
      {users.length !== 0 ? (
        <>
          <h1>
            <span className="badge bg-primary">
              {renderPhrase(users.length)}
            </span>
          </h1>
          <table className="table">{renderTable()}</table>
        </>
      ) : (
        <h1>
          <span className="badge bg-danger">Никто с тобой не тусанет</span>
        </h1>
      )}
    </>
  );
};

export default Users;
