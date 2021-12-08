import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
const User = ({ user }) => {
  return (
    <>
      <td>{user.name}</td>
      <td>
        {/* {user.qualities.map(({ name, color, _id }) => (
          <span key={_id} className={provideColor(color)}>
            {name}
          </span>
        ))} */}
        {user.qualities.map((quality) => (
          <Qualitie {...quality} key={quality._id} />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}</td>
      <td>BookMark</td>
      <td></td>
    </>
  );
};

export default User;
