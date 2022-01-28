import React from "react";
import PropTypes from "prop-types";

const Comment = ({ user, time, content }) => {
    return (
        <div class="bg-light card-body  mb-3">
            <div class="row">
                <div class="col">
                    <div class="d-flex flex-start ">
                        <img
                            src="https://avatars.dicebear.com/api/avataaars/qweqwdas"
                            class="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div class="flex-grow-1 flex-shrink-1">
                            <div class="mb-4">
                                <div class="d-flex justify-content-between align-items-center">
                                    <p class="mb-1 ">
                                        //User Name
                                        <span class="small">//Published Time</span>
                                    </p>
                                    <button class="btn btn-sm text-primary d-flex align-items-center">
                                        <i class="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <p class="small mb-0">//Comment content</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    user: PropTypes.object,
    time: PropTypes.string,
    content: PropTypes.string
};
export default Comment;
