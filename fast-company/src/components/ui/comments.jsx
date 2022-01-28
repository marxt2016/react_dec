import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AddNewComment from "../common/addNewComment";
import CommentsList from "../common/commentsList";
import api from "../../api";

const Comments = ({ users, id }) => {
    const [comments, setComments] = useState([]);
    useEffect(() => api.comments.fetchCommentsForUser(id).then((data) => setComments(data)), []);
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <>
            <AddNewComment users={users} onSubmit={onSubmit} />

            <CommentsList comments={comments} users={users} />
        </>
    );
};

Comments.propTypes = {
    id: PropTypes.string,
    users: PropTypes.array,
    time: PropTypes.string,
    content: PropTypes.string
};
export default Comments;
