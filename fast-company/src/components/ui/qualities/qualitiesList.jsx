import React from "react";
import Qualitie from "./quality";
import { useQuality } from "../../../hooks/useQuality";
import PropTypes from "prop-types";

const QualitiesList = (qualitiesIds) => {
    const { isLoading, getQuality } = useQuality();
    const qualityArray = getQuality(qualitiesIds);

    if (!isLoading) {
        return qualityArray.map((q) => <Qualitie {...q} key={q._id} />);
    } else return "Loading Qualities";
};
QualitiesList.propType = {
    ids: PropTypes.array
};
export default QualitiesList;
