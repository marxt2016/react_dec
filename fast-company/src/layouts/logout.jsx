import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../store/users";

// import { useAuth } from "../hooks/useAuth";
const Logout = () => {
    // const { logOut } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logOut());
    }, []);
    return <h1>Loading</h1>;
};

export default Logout;
