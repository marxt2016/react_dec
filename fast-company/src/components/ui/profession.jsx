import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessionsLoadingStatus, getProfessions } from "../../store/professions";

// import { useProfessions } from "../../hooks/useProfession";

const Profession = ({ id }) => {
    // const { getProfession } = useProfessions();
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const prof = professions.find((profession) => profession._id === id);
    // const prof = getProfessionByID(id)(professions);

    if (!professionsLoading) {
        return <p>{prof.name}</p>;
    } else return "Loading professions";
};
Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
