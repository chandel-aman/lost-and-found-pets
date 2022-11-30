const HttpError = require("../models/http-erorr");
const emailjs = require("@emailjs/browser");

//fetching breeds for the database

const sendEmail = async (req, res, next) => {
  console.log("Request in contact.");
  console.log(req);

  try {
    emailjs
      .send("contact_services", "contact_form", req.body, "fr3Emn9NUPhXMKnNG")
      .then(() => {
        console.log("Email sent!");
      });
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not send the message.", 500)
    );
  }

  res.status(200).json({emailSent: true});
};

exports.sendEmail = sendEmail;
