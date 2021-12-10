import React from "react";
import PropTypes from "prop-types";

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

BookMark.propTypes = {
    status: PropTypes.bool.isRequired,
    changeBookmark: PropTypes.func
};

export default BookMark;
