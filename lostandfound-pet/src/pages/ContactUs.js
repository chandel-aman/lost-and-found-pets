import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Formik, Field, ErrorMessage, Form } from "formik";
import { object, string, number } from "yup";
import emailjs from "@emailjs/browser";
import IonIcon from "@reacticons/ionicons";

import Wrapper from "../shared/UI/Wrapper";

import classes from "./ContactUs.module.css";
import Toast from "../shared/UI/toast/Toast";

const ContactForm = (props) => {
  const validationSchema = object({
    from_name: string()
      .min(3, "* Name should be greater than 3 letters.")
      .required("* Name field is required."),
    phone: string().length(10, "* Phone number should be of 10 digits."),
    subject: string()
      .min(5, "* Minimum 5 letters is required.")
      .required("* Subject field is required."),
    reply_to: string()
      .email("Invalid email address.")
      .required("* Email field is required."),
    message: string().required("* Message field is required."),
  });

  const styles = {
    color: "red",
    fontSize: "12px",
  };

  return (
    <div>
      <Formik
        initialValues={{
          from_name: "",
          phone: "",
          reply_to: "",
          message: "",
          subject: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values);
          try {
            emailjs
              .send(
                "contact_services",
                "contact_form",
                values,
                "fr3Emn9NUPhXMKnNG"
              )
              .then(() => {
                console.log("Email sent!");
                props.toastHandler();
              });
            setSubmitting(false);
            resetForm();
          } catch (error) {
            console.log(error);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={classes.form}>
            <div className={classes["form-details fullName"]}>
              <label htmlFor="fullname">Full Name</label>
              <Field type="text" name="from_name" placeholder="Sam Loup" />
              <ErrorMessage name="from_name" component="div" style={styles} />
            </div>
            <br />
            <div className={classes["form-details email"]}>
              <label htmlFor="mail">Email</label>
              <Field type="email" name="reply_to" placeholder="sam@loup.com" />
              <ErrorMessage name="reply_to" component="div" style={styles} />
            </div>
            <br />
            <div className={classes["form-details phone"]}>
              <label htmlFor="phone">Phone</label>
              <Field type="number" name="phone" placeholder="9876543210" />
              <ErrorMessage name="phone" component="div" style={styles} />
            </div>
            <br />
            <div className={classes["form-details subject"]}>
              <label htmlFor="subject">Subject</label>
              <Field
                type="text"
                name="subject"
                placeholder="State your subject.."
              />
              <ErrorMessage name="subject" component="div" style={styles} />
            </div>
            <br />
            <div className={classes["form-details message"]}>
              <label htmlFor="message">Message</label>
              <Field
                type="text"
                name="message"
                placeholder="Write your message.."
              />
              <ErrorMessage name="message" component="div" style={styles} />
            </div>
            <br />

            <button
              type="submit"
              className={classes.submitBtn}
              disabled={isSubmitting}
            >
              <IonIcon name="send" />
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const ContactUs = () => {
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(false);
  const toastHandler = () => {
    setToggle((prev) => !prev);
    setTimeout(() => {
      setToggle(false);
    }, 3000);
    setTimeout(() => navigate("/"), 3010);
  };

  return (
    <Wrapper>
      <Toast toggle={toggle}>Email successfully sent!</Toast>
      <div className={classes.contactUs}>
        <h2>Contact Us</h2>
        <p>Got any queries? Send us a message!</p>
        <div className={classes.contact}>
          <div className={classes.contactInfo}>
            <h2>Contact Information</h2>
            <p>Fill the form and we'll get back at you within 24 hours.</p>
            <div>
              <div className={classes.info}>
                <IonIcon name="mail" className={classes.mail} />
                <a href="mailto:sam@loup.com" target="_blank">
                  sam@loup.com
                </a>
              </div>
              <div className={classes.info}>
                <IonIcon name="call" />
                <a href="tel:+919876543210">+91 9876543210</a>
              </div>
              <div className={`${classes.info} ${classes.msg}`}>
                <IonIcon name="location" />
                <a href="https://goo.gl/maps/mko82vyWSznHXHUj8" target="_blank">
                  Mahish Bathan, Kolkata, West Bengal - 700156
                </a>
              </div>
            </div>
          </div>
          <ContactForm toastHandler={toastHandler} />
        </div>
      </div>
    </Wrapper>
  );
};

export default ContactUs;
