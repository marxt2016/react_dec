import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const Post = ({ id, posts }) => {
    const history = useHistory();

    const getPostById = (id) => {
        return posts.find((post) => post.id.toString() === id);
    };
    // const handleSave = () => {
    //     history.push("/posts");
    //     // history.replace("/posts");
    // };

    const handleSave = () => {
        history.replace("/posts");
    };
    const post = getPostById(id);
    return (
        <>
            <h1>{post ? post.label : `post not found ${id}`}</h1>
            <button
                onClick={() => {
                    handleSave();
                }}
            >
                Save
            </button>
        </>
    );
};

Post.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    posts: PropTypes.array,
    history: PropTypes.object
};

export default Post;
