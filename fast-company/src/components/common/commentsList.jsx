import React from "react";
import Comment from "./comment";
import PropTypes from "prop-types";

const CommentsList = ({ comments, users }) => {
    return (
        <>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {comments.map((comment) => (
                        <Comment key={comment._id} comment={comment} users={users} />
                    ))}
                </div>
            </div>
        </>
    );
};

CommentsList.propTypes = {
    comments: PropTypes.array,
    users: PropTypes.array
};
export default CommentsList;
