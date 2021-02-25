import React, { useEffect } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addLike, removeLike, deletePost } from "../actions/posts";

const PostItem = ({
  post: { avatar, comments, date, likes, user, name, text, _id },
  auth,
  addLike,
  removeLike,
  deletePost,
}) => {
  return (
    <div>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img className="round-img" src={avatar} />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on {<Moment format="DD/MM/YYYY">{date}</Moment>}
          </p>
          <button
            type="button"
            onClick={() => addLike(_id)}
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-up"></i>
            <span>{likes.length > 0 ? ` ` + likes.length : ` `}</span>
          </button>
          <button
            type="button"
            onClick={() => removeLike(_id)}
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-down"></i>
          </button>
          <Link to={`/post/${_id}`} className="btn btn-primary">
            Discussion{" "}
            {comments.length > 0 && (
              <span className="comment-count">{` ` + comments.length}</span>
            )}
          </Link>
          {auth.user._id === user && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                deletePost(_id);
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
  };
};

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
