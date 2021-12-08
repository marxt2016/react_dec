import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
const User = ({ user, changeBookmark, bookmark }) => {
  const { status } = bookmark;
  return (
    <>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((quality) => (
          <Qualitie {...quality} key={quality._id} />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}</td>
      <td>
        <Bookmark status={status} changeBookmark={changeBookmark} />
      </td>
      <td></td>
    </>
  );
};

export default User;
