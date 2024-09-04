const validateSchema = require("../helpers/validateSchema");
const { getAll, getSingle, create, update, remove } = require("../models/blog");
const { BlogCreate, BlogUpdate } = require("../models/blog/validate");

const getAllPosts = async (req, res) => {
  try {
    const data = await getAll(req.auth.id);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.send(500).send("Internal server error");
  }
};

const createPost = async (req, res) => {
  try {
    const data = {
      ...req.body,
      user_id: req.auth.id,
    };

    await validateSchema(data, BlogCreate);
    const newPost = await create(data);

    return res.status(201).send(newPost);
  } catch (err) {
    console.log(err);
    res.send(500).send("Internal server error");
  }
};

const updatePost = async (req, res) => {
  try {
    const data = {
      ...req.body,
      user_id: req.auth.id,
    };

    await validateSchema(data, BlogUpdate);
    const checkPost = await getSingle(req.params.id);

    if (!checkPost) {
      return res.status(400).send("Post not found!");
    }

    if (checkPost.user_id.toString() !== req.auth.id.toString()) {
      return res.status(400).send("User is not an owner of this post");
    }

    const updatedPost = await update(req.params.id, data);

    return res.status(200).send(updatedPost);
  } catch (err) {
    console.log(err);
    res.send(500).send("Internal server error");
  }
};

const removePost = async (req, res) => {
  try {
    const checkPost = await getSingle(req.params.id);
    if (!checkPost) {
      return res.status(400).send("Post not found");
    }
    if (checkPost.user_id.toString() !== req.auth.id.toString()) {
      return res.status(400).send("User is not owner of the post");
    }
    const removedPost = await remove(req.params.id);
    return res.status(200).send("Post successfully removed");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error!");
  }
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  removePost,
};
