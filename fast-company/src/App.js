import React, { useState } from "react";
import Users from "./components/users";
//import SearchStatus from "./components/searchStatus";
import api from "./api";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {};

  const handleToggleBookmark = (id) => {};
  return <Users />;
}

export default App;
