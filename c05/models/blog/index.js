const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Account",
  },
  title: String,
  content: String,
});

const PostModel = mongoose.model("Post", postSchema, "posts");

const getAll = async (id) => {
  return await PostModel.find({ user_id: id });
};

const getSingle = async (id) => {
  return await PostModel.findOne({ _id: id });
};

const create = async (data) => {
  const post = new PostModel(data);
  return await post.save();
};

const update = async (id, data) => {
  return await PostModel.updateOne({ _id: id }, data);
};

const remove = async (id) => {
  return await PostModel.deleteOne({ _id: id });
};

module.exports = {
  getAll,
  getSingle,
  create,
  update,
  remove,
};
