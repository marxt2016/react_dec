import React from "react";
// import User from "./user";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import Bookmark from "./bookmark";

const UsersTable = ({ users, onDelete, onChangeFavourites, bookmarks, onSort, selectedSort }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: { name: "Качества" },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    status={
                        Object.assign({}, ...bookmarks.filter((item) => item.id === user._id))
                            .status
                    }
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
    const renderTable = () => {
        return (
            <>
                <TableHeader {...{ onSort, selectedSort, columns }} />
                <TableBody {...{ columns, data: users }} />
                {/* // <tbody>
                //     {users.map((user) => (
                //         <tr key={user._id}>
                //             <User
                //                 user={user}
                //                 bookmark={Object.assign(
                //                     {},
                //                     ...bookmarks.filter((item) => item.id === user._id)
                //                 )}
                //                 changeBookmark={() => onChangeFavourites(user._id)}
                //             />
                //             <td>
                //                 <button
                //                     className="btn btn-danger"
                //                     onClick={() => onDelete(user._id)}
                //                 >
                //                     delete
                //                 </button>
                //             </td>
                //         </tr>
                //     ))}
                // </tbody> */}
            </>
        );
    };
    return <table className="table">{renderTable()}</table>;
};
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func,
    onChangeFavourites: PropTypes.func,
    onSort: PropTypes.func,
    bookmarks: PropTypes.array.isRequired,
    selectedSort: PropTypes.object.isRequired
};
export default UsersTable;
