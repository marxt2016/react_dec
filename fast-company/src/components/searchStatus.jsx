import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    const renderPhrase = (number) => {
        if (number > 4 && number < 15) return "Человек тусанет";
        const lastNumber = Number(number.toString().slice(-1));
        if ([2, 3, 4].indexOf(lastNumber) >= 0) return "Человека тусанут";
        if (lastNumber === 1) return "Человек тусанет";
        return "Человек тусанет";
    };
    return (
        <span className={"badge bg-" + (length > 0 ? "primary" : "danger")}>
            {length > 0
                ? `${length} ${renderPhrase(length)} с тобой сегодня`
                : "Никто с тобой не тусанет"}
        </span>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
