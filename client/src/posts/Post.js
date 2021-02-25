import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPost, addComment, deleteComment } from "../actions/posts";
import Spinner from "../components/Spinner";

const Post = ({
  post,
  loading,
  getPost,
  addComment,
  deleteComment,
  match,
  auth,
}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, []);

  var commentsArray = [];

  if (post) {
    commentsArray = post.comments.map((comment) => (
      <div className="post bg-white p-1 my-1" key={comment._id}>
        <div>
          <Link to={`/profile/${comment.user}`}>
            <img className="round-img" src={comment.avatar} />
            <h4>{comment.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{comment.text}</p>
          <p className="post-date">
            Posted on <Moment format="DD/MM/YY">{comment.date}</Moment>
          </p>

          {!loading && auth.user._id === comment.user && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                deleteComment(post._id, comment._id);
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
    ));
  }

  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment({ text }, post._id);
    setText("");
  };

  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${post.user}`}>
            <img className="round-img" src={post.avatar} />
            <h4>{post.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{post.text}</p>
        </div>
      </div>

      <div className="post-form">
        <div className="bg-primary p">
          <h3 className="ogcolor">Leave A Comment</h3>
        </div>
        <form className="form my-1" onSubmit={(e) => handleSubmit(e)}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            value={text}
            onChange={(e) => handleChange(e)}
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

      <div className="comments">{commentsArray}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.postReducer.post,
    loading: state.postReducer.loading,
    auth: state.authReducer,
  };
};

export default connect(mapStateToProps, { getPost, addComment, deleteComment })(
  Post
);
