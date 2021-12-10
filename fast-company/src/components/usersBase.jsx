import React, { useState } from "react";
import api from "../api";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userID) => {
        setUsers(users.filter((user) => user._id !== userID));
    };

    const renderPhrase = (number) => {
        if (number > 4 && number < 15) return "Человек тусанет";
        const lastNumber = Number(number.toString().slice(-1));
        if ([2, 3, 4].indexOf(lastNumber) >= 0) return "Человека тусанут";
        if (lastNumber === 1) return "Человек тусанет";
        return "Человек тусанет";
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
                                    <span
                                        key={_id}
                                        className={provideColor(color)}
                                    >
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
            <h2>
                <span
                    className={
                        "badge bg-" + (users.length > 0 ? "primary" : "danger")
                    }
                >
                    {users.length > 0
                        ? `${users.length} ${renderPhrase(
                              users.length
                          )} с тобой сегодня`
                        : "Никто с тобой не тусанет"}
                </span>
            </h2>
            {users.length > 0 && (
                <table className="table">{renderTable()}</table>
            )}
        </>
    );
};

export default Users;
