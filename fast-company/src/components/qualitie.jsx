import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ name, color }) => {
    const provideColor = (color) => {
        let classes = "badge m-1  ";
        classes += `bg-${color}`;
        return classes;
    };
    return <span className={provideColor(color)}>{name}</span>;
};

Qualitie.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default Qualitie;
