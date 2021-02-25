import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../actions/posts";
import PostForm from "./PostForm";
import PostItem from "./PostItem";

const Posts = ({ posts, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, []);

  const postArray = posts.map((post) => (
    <PostItem key={post._id} post={post} />
  ));

  return (
    <>
      <h1 className="large text-primary">Posts</h1>
      <PostForm />
      {postArray}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.postReducer.posts,
  };
};

export default connect(mapStateToProps, { getPosts })(Posts);
