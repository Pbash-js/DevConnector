const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Post = require("../../models/PostModel");
const User = require("../../models/UserModel");

//Post a post, POST /, Private
router.post(
  "/",
  [auth, check("text", "Text is required").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById({ _id: req.user.id }).select(
        "-password"
      );

      const newPost = new Post({
        text: req.body.text,
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
      });

      await newPost.save();

      res.json(newPost);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

//Get all posts, GET /, Private

router.get("/", auth, async (req, res) => {
  try {
    let allPosts = await Post.find().sort({ date: -1 });
    return res.json(allPosts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//Get a single post by its ID, GET /:id, Private
router.get("/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) return res.status(400).json({ msg: "Post not found" });
    return res.json(post);
  } catch (error) {
    if (error.type == "ObjectId")
      return status(400).json({ msg: "Post not found" });
    console.error(error.message);
  }
});

//Delete a single post by its ID, DELETE /:id, Private
router.delete("/:id", auth, async (req, res) => {
  try {
    //Not using find one and delete because we need to ensure it is impossible for someone who is not the poster to be able to delete the post

    const post = await Post.findById(req.params.id);

    if (!post) return res.status(400).json({ msg: "Post not found" });

    if (post.user.toString() != req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await post.remove();

    return res.send("Post removed");
  } catch (error) {
    if (error.type == "ObjectId")
      return status(400).json({ msg: "Post not found" });
    console.error(error.message);
  }
});

//Like a post by its ID, PUT /like/:id, Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({ msg: "Post not found" });
    }

    if (
      post.likes.filter((item) => {
        return item.user.toString() === req.user.id;
      }).length > 0
    ) {
      return res.status(400).json({ msg: "Post already Liked" });
    }
    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//Unlike a post by its ID, PUT /unlike/:id, Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({ msg: "Post not found" });
    }

    if (
      post.likes.filter((item) => {
        return item.user.toString() === req.user.id;
      }).length === 0
    ) {
      return res.status(400).json({ msg: "Post not liked" });
    }

    const removeIndex = post.likes
      .map((item) => item.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//comment on a post by its ID, PUT /comment/:id, Private
router.put("/comment/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (!post) {
      return res.status(400).json({ msg: "Post not found" });
    }

    const newComment = {
      user: req.user.id,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
    };

    post.comments.unshift(newComment);

    await post.save();

    return res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//Delete a comment on a post by its ID, DELETE /comment/:id/:comment_id, Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!post) {
      return res.status(400).json({ msg: "Post not found" });
    }

    if (!comment) {
      return res.status(400).json({ msg: "Comment not found" });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: "Not authorized" });
    }

    const removeIndex = post.comments
      .map((item) => item._id)
      .indexOf(req.params.comment_id);

    console.log(removeIndex);

    if (removeIndex >= 0) post.comments.splice(removeIndex, 1);
    else return res.status(400).json({ msg: "Comment not found" });

    await post.save();

    return res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
