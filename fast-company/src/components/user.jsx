import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Qualitie from "./qualitie";
import Spinner from "./spinner";
import api from "../api";
// import _ from "lodash";

const User = ({ id }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    const handleReturn = () => {
        history.replace("/users");
    };

    // const getUserById = (id) => {
    //     return users.find((user) => _.isEqual(user._id, id));
    // };
    // const user = getUserById(id);

    useEffect(() => {
        api.users.getById(id).then((data) => {
            setUser(data);
        });
    }, []);

    return (
        <>
            {user ? (
                <div className="m-3">
                    <h1>Name: {user.name}</h1>
                    <h2>Profession: {user.profession.name}</h2>
                    <div>
                        {user.qualities.map((quality) => (
                            <Qualitie {...quality} key={quality._id} />
                        ))}
                    </div>
                    <h3>Completed meetings: {user.completedMeetings}</h3>
                    <h3>Rate: {user.rate}</h3>
                    <button
                        onClick={() => {
                            handleReturn();
                        }}
                    >
                        Back to Users
                    </button>
                </div>
            ) : (
                <>
                    <h1>Loading</h1>
                    <Spinner />
                </>
            )}
        </>
    );
};

User.propTypes = {
    users: PropTypes.array,
    id: PropTypes.string
};

export default User;
