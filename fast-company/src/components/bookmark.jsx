import React from "react";

const BookMark = ({ status, changeBookmark }) => {
  return (
    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={() => changeBookmark()}
    >
      <i className={"bi bi-bookmark" + (status ? "-fill" : "")}></i>
    </button>
  );
};

export default BookMark;
