import React from "react";
import PropTypes from "prop-types";
import AddNewComment from "../common/addNewComment";

const Comments = ({ users, user, time, content }) => {
    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <>
            <AddNewComment users={users} onSubmit={onSubmit} />

            <div className="card mb-3">
                <div className="card-body">
                    <h2>Comments</h2>
                    <hr />
                    <div className="bg-light card-body mb-3">
                        <div className="row">
                            <div className="col">
                                <div className="d-flex flex-start">
                                    <img
                                        src="https://avatars.dicebear.com/api/avataaars/qweqasdas.svg"
                                        className="rounded-circle shadow-1-strong me-3 "
                                        alt="avatar"
                                        width="65"
                                        height="65"
                                    />
                                    <div className="flex-grow-1 flex-shrink-1">
                                        <div className="mb-4">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="mb-1">
                                                    Джон Дориан
                                                    <span className="small">5 минут назад</span>
                                                </p>
                                                <button className="btn btn-sm text-primary d-flex align-items-center">
                                                    <i className="bi bi-x-lg"></i>
                                                </button>
                                            </div>
                                            <p className="small mb-0">
                                                Lorem ipsum dolor sit amet consectetur adipisicing
                                                elit. Corporis, soluta facilis fugit hic quasi
                                                sapiente accusamus quia voluptatem dolorum
                                                laboriosam id iste voluptas modi animi eius
                                                voluptatum adipisci amet officiis.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Comments.propTypes = {
    user: PropTypes.object,
    users: PropTypes.array,
    time: PropTypes.string,
    content: PropTypes.string
};
export default Comments;
