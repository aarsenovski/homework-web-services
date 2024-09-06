const { getSingle, create, getAll, update, remove } = require("../models/cars");

const getAllCars = async (req, res) => {
  try {
    const data = await getAll(req.auth.id);
    return res.status(200).send(data);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error!");
  }
};

const createCar = async (req, res) => {
  try {
    const data = {
      ...req.body,
      owner: req.auth.id,
    };
    const newCar = await create(data);
    return res.status(200).send(newCar);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error!");
  }
};

const updateCar = async (req, res) => {
  try {
    const data = {
      ...req.body,
      owner: req.auth.id,
    };

    const checkCar = await getSingle(req.params.id);
    console.log(checkCar);

    if (!checkCar) {
      return res.status(400).send("Car not found");
    }

    if (checkCar.owner.toString() !== req.auth.id.toString()) {
      return res.status(400).send("User is not owner of this car!");
    }
    const updatedCar = await update(req.params.id, data);

    return res.status(201).send(updatedCar);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error!");
  }
};

const removeCar = async (req, res) => {
  try {
    const checkCar = await getSingle(req.params.id);

    if (!checkCar) {
      return res.status(400).send("Car not found");
    }

    if (checkCar.owner.toString() !== req.auth.id.toString()) {
      return res.status(400).send("User is not owner of this car!");
    }
    const removedCar = await remove(req.params.id);
    return res.status(200).send(removedCar);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error!");
  }
};

module.exports = {
  updateCar,
  removeCar,
  getAllCars,
  createCar,
};
