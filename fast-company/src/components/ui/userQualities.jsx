import React from "react";
import PropTypes from "prop-types";
import Qualitie from "../ui/qualities/quality";

const UserQaualities = ({ user }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Qualities</span>
                </h5>
                <p className="card-text">
                    {user.qualities.map((quality) => (
                        <Qualitie {...quality} key={quality._id} />
                    ))}
                </p>
            </div>
        </div>
    );
};

UserQaualities.propTypes = {
    user: PropTypes.object
};
export default UserQaualities;
