const express = require("express");

const breedsController = require("../controllers/breeds-controller");

const router = express.Router();

router.get("/", breedsController.getBreeds);

module.exports = router;
