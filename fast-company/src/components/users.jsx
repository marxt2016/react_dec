import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import api from "../api";
import _ from "lodash";

const Users = ({ users, onDelete, onChangeFavourites, bookmarks }) => {
    const pageSize = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const filteredUsers = selectedProf
        ? users.filter((user) => _.isEqual(user.profession, selectedProf))
        : users;

    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);
    if (userCrop.length === 0 && count) {
        setCurrentPage(1);
    }
    const clearFilter = () => {
        setSelectedProf();
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
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        selectedItem={selectedProf}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <h2>
                    <SearchStatus length={count} />
                </h2>
                {count > 0 && <table className="table">{renderTable()}</table>}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func,
    onChangeFavourites: PropTypes.func,
    bookmarks: PropTypes.array.isRequired
};
export default Users;
