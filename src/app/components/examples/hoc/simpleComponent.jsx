import React, { useEffect } from "react";
import PropTypes from "prop-types";

const SimpleComponenet = ({ onLogin, onLogout, isAuth }) => {
    useEffect(() => {
        console.log("render button");
    });
    return (
        <>
            {isAuth ? (
                <button onClick={onLogout} className="btn btn-primary mx-2">
                    Logout
                </button>
            ) : (
                <button onClick={onLogin} className="btn btn-primary mx-2">
                    Login
                </button>
            )}
        </>
    );
};
SimpleComponenet.propTypes = {
    onLogin: PropTypes.func,
    onLogout: PropTypes.func,
    isAuth: PropTypes.bool
};

export default SimpleComponenet;
