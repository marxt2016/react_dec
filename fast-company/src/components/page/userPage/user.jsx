import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";

import api from "../../../api";
import EditForm from "../../ui/editForm";

import Comments from "../../ui/comments";
import UserCard from "../../ui/userCard";
import UserQualities from "../../ui/userQualities";
import UserMeetings from "../../ui/userMeetings";

const User = ({ id, users, professions }) => {
    const history = useHistory();
    const { edit } = useParams();
    const [user, setUser] = useState();
    const handleReturn = () => {
        history.replace("/users");
    };

    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, [edit]);

    return (
        <>
            {user ? (
                edit ? (
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-6 offset-md-3 shadow p-4">
                                <EditForm user={user} professions={professions} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container">
                        <div className="row gutters-sm">
                            <div className="col-md-4 mb-3">
                                <UserCard user={user} />
                                <UserQualities user={user} />
                                <UserMeetings user={user} />
                            </div>
                            <div className="col-md-8">
                                <Comments users={users} id={id} />
                                <button
                                    className="btn btn-primary m-2"
                                    onClick={() => {
                                        handleReturn();
                                    }}
                                >
                                    Back to Users
                                </button>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <>
                    <h1>Loading</h1>
                </>
            )}
        </>
    );
};

User.propTypes = {
    users: PropTypes.array,
    professions: PropTypes.object,
    id: PropTypes.string
};

export default User;
