const mongoose = require("mongoose");

const HttpError = require("../models/http-erorr");
const Breeds = require("../models/breeds");

//fetching breeds for the database

const getBreeds = async (req, res, next) => {
  console.log("GET request in breeds.");

  let breeds;
  try {
    breeds = await Breeds.find().exec();
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not find breeds.", 500)
    );
  }

  if (breeds) {
    // console.log(breeds);
  }

  res.status(200).json({
    breeds: breeds,
  });
};

exports.getBreeds = getBreeds;
