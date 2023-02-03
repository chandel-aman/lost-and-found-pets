const express = require("express");
const { check } = require("express-validator");

const petController = require("../controllers/pets-controller");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/allPets", petController.getPet);

router.get("/:id", petController.getPetById);

router.post(
  "/lostPet",
  fileUpload.single("file"),
  [
    check("firstName").not().isEmpty(),
    check("lastName").not().isEmpty(),
    check("phone").not().isEmpty(),
    check("phone").isLength({ max: 10 }),
    check("email").normalizeEmail().isEmail(),
    check("address").not().isEmpty(),
    check("petType").not().isEmpty(),
    check("breed").not().isEmpty(),
    check("color").not().isEmpty(),
    check("lost").not().isEmpty(),
  ],
  petController.createPet
);

router.delete("/:petId", petController.deletePet);

module.exports = router;
