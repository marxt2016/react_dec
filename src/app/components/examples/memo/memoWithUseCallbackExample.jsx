import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

const LogOutButton = ({ onLogout }) => {
    useEffect(() => {
        console.log("render button");
    });
    return (
        <button className="btn btn-primary" onClick={onLogout}>
            LogOUT
        </button>
    );
};
function areEqual(prevState, nextState) {
    if (prevState.onLogout !== nextState.onLogout) {
        return false;
    }
    return true;
}
const MemoisedLogoutBtn = React.memo(LogOutButton, areEqual);

const MemoWithUseCallbackExample = (props) => {
    const [state, setState] = useState(false);
    const handleLogout = useCallback(() => {
        localStorage.removeItem("auth");
    }, [props]);

    return (
        <>
            <button
                className="btn btn-primary"
                onClick={() => setState(!state)}
            >
                Initiate rerender
            </button>
            <MemoisedLogoutBtn onLogout={handleLogout} />
        </>
    );
};

LogOutButton.propTypes = {
    onLogout: PropTypes.func
};
export default MemoWithUseCallbackExample;
