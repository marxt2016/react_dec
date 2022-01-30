import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AddNewComment from "../common/addNewComment";
import CommentsList from "../common/commentsList";
import api from "../../api";
import _ from "lodash";

const Comments = ({ id, users }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => api.comments.fetchCommentsForUser(id).then((data) => setComments(data)), []);
    const onSubmit = (data) => {
        api.comments
            .add({
                userId: users.filter((user) => user.name === data.user)[0]._id,
                pageId: id,
                content: data.comment
            })
            .then((data) => {
                setComments([...comments, data]);
            });
    };

    const onDelete = (id) => {
        api.comments.remove(id).then((data) => {
            setComments(comments.filter((comment) => comment._id !== id));
        });
    };
    const commentsOrderedDesc = _.orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <AddNewComment users={users} onSubmit={onSubmit} />
            {commentsOrderedDesc.length > 0 && (
                <CommentsList comments={commentsOrderedDesc} users={users} onDelete={onDelete} />
            )}
        </>
    );
};

Comments.propTypes = {
    id: PropTypes.string,
    users: PropTypes.array
};
export default Comments;
