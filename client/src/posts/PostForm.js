import React, { useState } from "react";
import { connect } from "react-redux";
import { makePost } from "../actions/posts";

const PostForm = ({ makePost }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    makePost({ text });
    setText("");
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3 className="ogcolor">What's up?</h3>
      </div>
      <form className="form my-1" onSubmit={(e) => handleSubmit(e)}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          onChange={(e) => handleChange(e)}
          value={text}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default connect(null, { makePost })(PostForm);
