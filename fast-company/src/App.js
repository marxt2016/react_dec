import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());
    const initialBookmarks = users.map(({ _id }) => ({
        id: _id,
        status: false
    }));
    const [bookmarks, setBookmarks] = useState(initialBookmarks);
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
            <h2>
                <SearchStatus length={users.length} />
            </h2>
            <Users
                users={users}
                onDelete={handleDelete}
                onChangeFavourites={handleToggleBookmark}
                bookmarks={bookmarks}
            />
        </>
    );
}

export default App;
