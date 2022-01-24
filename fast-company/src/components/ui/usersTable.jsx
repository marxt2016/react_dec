import React from "react";
import PropTypes from "prop-types";
import TableHeader from "../common/table/tableHeader";
import TableBody from "../common/table/tableBody";
import Bookmark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";

const UsersTable = ({ users, onDelete, onChangeFavourites, onSort, selectedSort }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    status={user.bookmark}
                    changeBookmark={() => onChangeFavourites(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button className="btn btn-danger" onClick={() => onDelete(user._id)}>
                    delete
                </button>
            )
        }
    };

    return (
        // <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users} />
        <Table>
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data: users }} />
        </Table>
    );
};
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func,
    onChangeFavourites: PropTypes.func,
    onSort: PropTypes.func,

    selectedSort: PropTypes.object.isRequired
};
export default UsersTable;
