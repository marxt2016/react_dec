import React, { useState } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import PropTypes from "prop-types";

const Users = ({ users, onDelete, onChangeFavourites, bookmarks }) => {
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const userCrop = paginate(users, currentPage, pageSize);

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
                    {userCrop.map((user) => (
                        <tr key={user._id}>
                            <User
                                user={user}
                                bookmark={Object.assign(
                                    {},
                                    ...bookmarks.filter(
                                        (item) => item.id === user._id
                                    )
                                )}
                                changeBookmark={() =>
                                    onChangeFavourites(user._id)
                                }
                            />
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
            {count > 0 && <table className="table">{renderTable()}</table>}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func,
    onChangeFavourites: PropTypes.func,
    bookmarks: PropTypes.array.isRequired
};
export default Users;
