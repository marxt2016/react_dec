import React from "react";
import PropTypes from "prop-types";
import TableHeader from "../common/table/tableHeader";
import TableBody from "../common/table/tableBody";
import Bookmark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import Profession from "./profession";

const UsersTable = ({ users, onDelete, onToggleBookMark, onSort, selectedSort }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />
        },
        professions: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark status={user.bookmark} onClick={() => onToggleBookMark(user._id)} />
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
    onToggleBookMark: PropTypes.func,
    onSort: PropTypes.func,

    selectedSort: PropTypes.object.isRequired
};
export default UsersTable;
