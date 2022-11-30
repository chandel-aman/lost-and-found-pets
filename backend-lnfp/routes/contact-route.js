const express = require("express");
const { check } = require("express-validator");

const contactControllers = require("../controllers/contact-controller");

const router = express.Router();

router.post(
  "/",
  [
    check("from_name").not().isEmpty(),
    check("phone").isLength({ max: 10 }),
    check("reply_to").normalizeEmail().isEmail(),
    check("subject").not().isEmpty().isLength({ min: 5 }),
    check("message").not().isEmpty(),
  ],
  contactControllers.sendEmail
);

module.exports = router;
