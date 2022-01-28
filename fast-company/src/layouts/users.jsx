import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "../components/common/pagination";
import GroupList from "../components/common/groupList";
import SearchStatus from "../components/ui/searchStatus";
import api from "../api";
import _ from "lodash";
import Spinner from "../components/common/spinner";
import UsersTable from "../components/ui/usersTable";
import User from "../components/page/userPage/user";
import { useParams } from "react-router-dom";
import TextField from "../components/common/form/textField";

const Users = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState();

    const params = useParams();
    const [searchValue, setSearchValue] = useState("");
    const handleChange = (event) => {
        setSelectedProf(undefined);
        setSearchValue(event.value);
    };
    console.log(users);
    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
    }, [params]);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookmark = (id) => {
        users.map((user) => {
            if (user._id === id) {
                user.bookmark = !user.bookmark;
                api.users.update(id, user);
            }
            return user;
        });
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchValue]);

    const handleProfessionSelect = (item) => {
        setSearchValue("");
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const clearFilter = () => {
        setSelectedProf();
    };
    if (users) {
        const { userId } = params;
        let filteredUsers;
        if (!searchValue.trim()) {
            filteredUsers = selectedProf
                ? users.filter((user) => _.isEqual(user.profession, selectedProf))
                : users;
        } else {
            filteredUsers = users.filter((user) =>
                user.name.toLowerCase().includes(searchValue.trim().toLowerCase())
            );
        }

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        if (userCrop.length === 0 && count) {
            setCurrentPage(1);
        }

        return (
            <>
                {userId ? (
                    <User users={users} id={userId} professions={professions} />
                ) : (
                    <div className="d-flex">
                        {!professions ? (
                            <Spinner />
                        ) : (
                            <div className="d-flex flex-column flex-shrink-0 p-3">
                                <GroupList
                                    items={professions}
                                    onItemSelect={handleProfessionSelect}
                                    selectedItem={selectedProf}
                                />
                                <button className="btn btn-secondary mt-2" onClick={clearFilter}>
                                    Очистить
                                </button>
                            </div>
                        )}
                        <div className="d-flex flex-column">
                            <h2>
                                <SearchStatus length={count} />
                            </h2>
                            <TextField
                                name="search"
                                value={searchValue}
                                onChange={handleChange}
                                placeholder="Search..."
                            />
                            {count > 0 && (
                                <UsersTable
                                    users={userCrop}
                                    onDelete={handleDelete}
                                    onChangeFavourites={handleToggleBookmark}
                                    onSort={handleSort}
                                    selectedSort={sortBy}
                                />
                            )}

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
                )}
            </>
        );
    }
    return <Spinner />;
};

export default Users;
