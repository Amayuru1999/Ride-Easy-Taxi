const Rider = require("../models/riderModel");
const mongoose = require("mongoose");
//get all riders
const getRiders = async (req, res) => {
  const riders = await Rider.find({}).sort({ createdAt: -1 });
  res.status(200).json(riders);
};
//get a single rider
const getRider = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such rider" });
  }
  const rider = await Rider.findById(id);

  if (!rider) {
    return res.status(404).json({ error: "No such rider" });
  }
  res.status(200).json(rider);
};
//create new rider
const createRider = async (req, res) => {
  const {
    firstName,
    lastName,
    ride,
    country,
    rideType,
    homeAddress,
    phoneNumber,
    dateofBirth,
  } = req.body;
  let emptyFields = [];

  if (!firstName) {
    emptyFields.push("firstName");
  }
  if (!lastName) {
    emptyFields.push("lastName");
  }
  if (!ride) {
    emptyFields.push("ride");
  }
  if (!country) {
    emptyFields.push("country");
  }
  if (!rideType) {
    emptyFields.push("rideType");
  }
  if (!homeAddress) {
    emptyFields.push("homeAddress");
  }
  if (!phoneNumber) {
    emptyFields.push("phoneNumber");
  }
  if (!dateofBirth) {
    emptyFields.push("dateofBirth");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  //add doc to db
  try {
    const rider = await Rider.create({
      firstName,
      lastName,
      ride,
      country,
      rideType,
      homeAddress,
      phoneNumber,
      dateofBirth,
    });
    res.status(200).json(rider);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a rider
const deleteRider = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ride" });
  }

  const rider = await Rider.findOneAndDelete({ _id: id });
  if (!rider) {
    return res.status(404).json({ error: "No such ride" });
  }
  res.status(200).json(rider);
};
//update a rider
const updateRider = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ride" });
  }

  const rider = await Rider.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!rider) {
    return res.status(404).json({ error: "No such ride" });
  }
  res.status(200).json(rider);
};

module.exports = {
  getRider,
  getRiders,
  createRider,
  deleteRider,
  updateRider,
};
