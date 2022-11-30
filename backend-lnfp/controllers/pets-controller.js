const mongoose = require("mongoose");
const fs = require("fs");

const { validationResult } = require("express-validator");

const HttpError = require("../models/http-erorr");
const Pet = require("../models/lostPet");

// Storing a lost pet in the database

const createPet = async (req, res, next) => {
  console.log("POST request in create;");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Invaid user input, please check your data and try again!",
        422
      )
    );
  }

  const {
    firstName,
    lastName,
    phone,
    email,
    address,
    petType,
    petName,
    breed,
    sex,
    color,
    mark,
    reward,
    lost,
  } = req.body;

  const createdPet = new Pet({
    firstName: firstName.toLowerCase(),
    lastName: lastName.toLowerCase(),
    phone,
    email: email.toLowerCase(),
    address: address.toLowerCase(),
    petName: petName.toLowerCase(),
    petType: petType.toLowerCase(),
    sex: sex.toLowerCase(),
    breed: breed.toLowerCase(),
    color: color.toLowerCase(),
    mark,
    file: req.file.path,
    reward,
    lost,
  });

  try {
    await createdPet.save();
  } catch (error) {
    console.log(error);
    return next(new HttpError("Creating pet failed, please try again!"));
  }

  res.status(201).json({
    message: "Pet created",
    pet: createdPet.toObject({ getters: true }),
  });
};

//fetching all the pets form the database

const getPet = async (req, res, next) => {
  console.log("GET request for all pets.");
  let pets;
  try {
    pets = await Pet.find();
  } catch (error) {
    console.log(error);
    const errors = new HttpError(
      "Fetching pets failed, please try again later.",
      500
    );
    return next(errors);
  }
  res.json({ pets: pets.map((p) => p.toObject({ getters: true })) });
};

//fetching pet using the pet id

const getPetById = async (req, res, next) => {
  console.log("GET request for a pet.");
  const petId = req.params.id;

  let pet;
  try {
    pet = await Pet.findById(petId);
  } catch (error) {
    return next(new HttpError("Something went wrong, could not find the pet."));
  }

  //if there is no pet with the given id then throw an error
  if (!pet) {
    return next(new HttpError("Could not find a place with the provided id!"));
  }

  //give the response
  res.json({ pet: pet.toObject({ getters: true }) });
};

//deleting the pet details from the database
const deletePet = async (req, res, next) => {
  const petId = req.params.petId;
  let pet;
  try {
    pet = await Pet.findById(petId);
  } catch (error) {
    return next(
      new HttpError(
        "Something went wrong, could not find the pet for deletion.",
        500
      )
    );
  }

  //if the pet is not present
  if (!pet) {
    return next(
      new HttpError("Could not find the place with provided id.", 404)
    );
  }

  //deleting the pet
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await pet.deleteOne({ session });
    await session.commitTransaction();
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not delete the pet.", 500)
    );
  }

  //deleting the picture of the pet
  fs.rm(pet.file, (error) => console.log(error));

  res.status(200).json({ message: "Pet deleted!" });
};

exports.createPet = createPet;
exports.getPet = getPet;
exports.getPetById = getPetById;
exports.deletePet = deletePet;
