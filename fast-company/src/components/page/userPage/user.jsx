import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { Link, useHistory, useParams } from "react-router-dom";
import Qualitie from "../../ui/qualities/quality";
import api from "../../../api";
import EditForm from "../../ui/editForm";

const User = ({ id, users }) => {
    const history = useHistory();
    const { edit } = useParams();
    const [user, setUser] = useState();
    const handleReturn = () => {
        history.replace("/users");
    };
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, [edit]);
    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };
    return (
        <>
            {user ? (
                edit ? (
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-6 offset-md-3 shadow p-4">
                                <EditForm user={user} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="m-3">
                        <h1>Name: {user.name}</h1>
                        <h2>Profession: {user.profession.name}</h2>
                        <h2>{user.sex}</h2>
                        <h2>{user.email}</h2>
                        <div>
                            {user.qualities.map((quality) => (
                                <Qualitie {...quality} key={quality._id} />
                            ))}
                        </div>
                        <h3>Completed meetings: {user.completedMeetings}</h3>
                        <h3>Rate: {user.rate}</h3>
                        <button
                            className="btn btn-primary m-2"
                            onClick={() => {
                                handleReturn();
                            }}
                        >
                            Back to Users
                        </button>

                        <Link to={`/users/${id}/edit`} className="btn btn-primary">
                            Edit user
                        </Link>
                        <button className="btn btn-primary m-2" onClick={handleClick}>
                            Change user
                        </button>
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
    id: PropTypes.string
};

export default User;
