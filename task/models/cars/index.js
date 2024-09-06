const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Account",
  },
  brand: String,
  model: String,
  year: Number,
});

const Carmodel = mongoose.model("Car", carSchema, "cars");

const getAll = async (owner) => {
  return await Carmodel.find({
    owner,
  });
};

const getSingle = async (id) => {
  return await Carmodel.findOne({ _id: id });
};

const create = async (data) => {
  const newCar = new Carmodel(data);
  return await newCar.save();
};

const update = async (_id, data) => {
  return await Carmodel.updateOne({ _id }, data);
};

const remove = async (_id) => {
  return await Carmodel.deleteOne({ _id });
};

module.exports = {
  getAll,
  create,
  update,
  remove,
  getSingle,
};
