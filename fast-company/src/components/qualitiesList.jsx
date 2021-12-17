import React from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";

const QualitiesList = (qualities) => {
    return (
        <>
            {qualities.qualities.map((quality) => (
                <Qualitie {...quality} key={quality._id} />
            ))}
        </>
    );
};
QualitiesList.propType = {
    qualities: PropTypes.array
};
export default QualitiesList;
