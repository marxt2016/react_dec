import React from "react";
import PostsList from "../postsList";
import Post from "./post";
import PropTypes from "prop-types";
// import query from "query-string";
// import _ from "lodash";

import { useParams } from "react-router-dom";

const posts = [
    { id: 1, label: "post1" },
    { id: 2, label: "post2" },
    { id: 3, label: "post3" }
];

// const Posts = ({ match, location }) => {
//     const postId = match.params.postId;
//     // const search = query.parse(location.search);
//     // const cropPosts = search ? _(posts).slice(0).take(search.count).value() : posts;
//     return <>{postId ? <Post posts={posts} id={postId} /> : <PostsList posts={cropPosts} />}</>;
// };
// const Posts = ({ match, history }) => {
//     const postId = match.params.postId;
//     return (
//         <>
//             {postId ? (
//                 <Post posts={posts} id={postId} history={history} />
//             ) : (
//                 <PostsList posts={posts} />
//             )}
//         </>
//     );
// };

const Posts = () => {
    const params = useParams();
    const { postId } = params;
    return <>{postId ? <Post posts={posts} id={postId} /> : <PostsList posts={posts} />}</>;
};

Posts.propTypes = {
    posts: PropTypes.array,
    match: PropTypes.object,
    history: PropTypes.object
};

export default Posts;
