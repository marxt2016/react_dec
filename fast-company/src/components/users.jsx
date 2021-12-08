import React from "react";
import SearchStatus from "./searchStatus";
import User from "./user";

const Users = ({ users, onDelete }) => {
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
            <th scope="col">Избранное</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <User user={user} />
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(user._id)}
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
      <h2>
        <SearchStatus length={users.length} />
      </h2>
      {users.length > 0 && <table className="table">{renderTable()}</table>}
    </>
  );
};

export default Users;
