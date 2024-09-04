const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const AccountModel = mongoose.model("Account", accountSchema, "accounts");

const read = async () => {
  return await AccountModel.find();
};

const create = async (data) => {
  const newAccount = new AccountModel(data);
  return await newAccount.save();
};

const update = async (_id, data) => {
  return await AccountModel.updateOne({ _id }, data);
};

const remove = async (_id) => {
  return await AccountModel.deleteOne({ _id });
};

const getByEmail = async (email) => {
  return await AccountModel.findOne({ email });
};

module.exports = {
  read,
  create,
  update,
  remove,
  getByEmail,
};
