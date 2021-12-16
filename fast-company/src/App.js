import React, { useState, useEffect } from "react";
import Users from "./components/users";
import Spinner from "./components/spinner";
import api from "./api";

function App() {
    const [users, setUsers] = useState();
    const [bookmarks, setBookmarks] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);

            setBookmarks(
                data.map(({ _id }) => ({
                    id: _id,
                    status: false
                }))
            );
        });
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
        setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== userId));
    };

    const handleToggleBookmark = (id) => {
        const newBookmarks = bookmarks.map((item) =>
            item.id === id ? { ...item, status: !item.status } : item
        );
        setBookmarks(newBookmarks);
    };
    return (
        <>
            {!users || !bookmarks ? (
                <Spinner />
            ) : (
                <Users
                    users={users}
                    onDelete={handleDelete}
                    onChangeFavourites={handleToggleBookmark}
                    bookmarks={bookmarks}
                />
            )}
        </>
    );
}

export default App;
