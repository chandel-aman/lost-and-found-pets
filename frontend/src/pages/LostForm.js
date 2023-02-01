import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHttpClient } from "../shared/hooks/http-hook";

import Button from "../shared/UI/Button/Button";
import Wrapper from "../shared/UI/Wrapper";
import LoadingSpinner from "../shared/UI/Loading/LoadingSpinner";

import classes from "./LostForm.module.css";

const initialValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  petName: "",
  petType: "",
  breed: "",
  sex: "",
  color: "",
  mark: "",
  file: "",
  reward: "",
};

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (/[0-9]/.test(values.firstName)) {
    errors.firstName = "Only [A-Z] and [a-z] are allowed!";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (/[0-9]/.test(values.lastName)) {
    errors.lastName = "Only [A-Z] and [a-z] are allowed!";
  }

  if (!values.phone) {
    errors.phone = "Required";
  } else if (values.phone.length > 10) {
    errors.phone = "Too Long!";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.address) {
    errors.address = "Required";
  }

  if (!values.petName) {
    errors.petName = "Pet's name is required. ";
  }

  if (!values.petType) {
    errors.petType = "Required";
  }

  if (!values.sex) {
    errors.petType = "Required";
  }

  if (!values.color) {
    errors.color = "Required";
  } else if (/[0-9]/.test(values.color)) {
    errors.color = "Only [A-Z] and [a-z] are allowed!";
  }
  if (!values.file) {
    errors.file = "Required";
  }

  return errors;
};

const LostForm = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState("");
  const [breeds, setBreeds] = useState();
  const [toggle, setToggle] = useState(false);
  const [type, setType] = useState("");

  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  //fetching the breeds of different pets
  useEffect(() => {
    const fetchUsers = async () => {
      let responseData;
      try {
        responseData = await sendRequest("https://amused-cyan-shrimp.cyclic.app/api/breeds");
        const data = await responseData.breeds[0].breeds;
        setBreeds(data);
      } catch (error) {}
    };
    fetchUsers();
  }, [sendRequest]);

  //setting the image url
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImageUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  let breed;
  if (breeds) {
    if (type === "dog" && !toggle) {
      breed = breeds.dogBreeds.slice(0, 4);
    } else if (type === "dog" && toggle) {
      breed = breeds.dogBreeds;
    } else if (type === "cat" && !toggle) {
      breed = breeds.catBreeds.slice(0, 4);
    } else if (type === "cat" && toggle) {
      breed = breeds.catBreeds;
    } else if (type === "ham") {
      breed = breeds.hamBreeds;
    } else {
      breed = breeds.dogBreeds
        .slice(0, 3)
        .concat(breeds.catBreeds.slice(0, 3), breeds.hamBreeds.slice(0, 3));
    }
  }


  const typeChangeHandler = (e) => {
    setType(e.target.value);
  };

  //default style for error messages
  const styles = {
    color: "red",
    fontSize: "12px",
    textAlign: "centre",
  };

  return (
    <Wrapper>
      {isLoading && <LoadingSpinner />}
      <div className={classes.main}>
        <h2>Report Your Lost Pet</h2>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            // console.log(values);
            //   setImageUrl(values.file.name);

            //sending data to backend
            try {
              const formData = new FormData();

              formData.append("firstName", values.firstName);
              formData.append("lastName", values.lastName);
              formData.append("phone", values.phone);
              formData.append("email", values.email);
              formData.append("address", values.address);
              formData.append("petName", values.petName);
              formData.append("petType", values.petType);
              formData.append("breed", values.breed);
              formData.append("color", values.color);
              formData.append("mark", values.mark);
              formData.append("file", values.file);
              formData.append("reward", values.reward);
              formData.append("sex", values.sex);
              formData.append("lost", true);
              await sendRequest(
                "https://amused-cyan-shrimp.cyclic.app/api/pet/lostPet",
                "POST",
                formData
              );
            } catch (error) {
              console.log(error);
            }

            resetForm();
            setImageUrl("");
            setSubmitting(false);
            navigate("/");
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className={classes.form}>
              <div className={classes.formContainer}>
                <div className={classes.personalInfo}>
                  <div>
                    <h3>Personal Info</h3>
                    <label htmlFor="firstName">First Name</label>
                    <br />
                    <Field type="text" name="firstName" placeholder="Sam" />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      style={styles}
                    />
                    <br />
                    <label htmlFor="lastName">Last Name</label>
                    <br />
                    <Field type="text" name="lastName" placeholder="Loup" />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      style={styles}
                    />
                    <br />
                  </div>
                  <hr />
                  <div>
                    <h3>Contact Details</h3>
                    <label htmlFor="phone">Phone</label>
                    <br />
                    <Field
                      type="number"
                      name="phone"
                      placeholder="9876543210"
                    />
                    <ErrorMessage name="phone" component="div" style={styles} />
                    <br />
                    <label htmlFor="email">Email</label>
                    <br />
                    <Field
                      type="email"
                      name="email"
                      placeholder="test@test.com"
                    />
                    <ErrorMessage name="email" component="div" style={styles} />
                    <br />
                    <label htmlFor="address">Address</label>
                    <br />
                    <Field
                      type="text"
                      name="address"
                      placeholder="12, Park Street"
                      className={classes.address}
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      style={styles}
                    />
                  </div>
                </div>
                <div className={classes.petDetails}>
                  <h3>Pet Details</h3>
                  <label htmlFor="petName">Pet's Name</label>
                  <br />
                  <Field type="text" name="petName" placeholder="Max" />
                  <ErrorMessage name="petName" component="div" style={styles} />
                  <br />
                  <label htmlFor="petType">Pet Type</label>
                  <br />
                  <Field as="select" name="petType" onChange={typeChangeHandler}>
                    <option value="">--</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="ham">Ham</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage name="petType" component="div" style={styles} />
                  <br />
                  <label htmlFor="breed">Breed</label>
                  <br />
                  <Field as="select" name="breed">
                    <option value="">--</option>
                    {breed &&
                      breed.map((p) => (
                        // <div key={`${type}_${p}`}>
                        //   <input
                        //     type="radio"
                        //     id={p}
                        //     value={p}
                        //     name="pet-breed"
                        //   />
                        //   <label htmlFor={p}>{p}</label>
                        //   <br />
                        // </div>
                        <option key={`${type}_${p}`} value={p}>
                          {p}
                        </option>
                      ))}
                  </Field>
                  <ErrorMessage name="breed" component="div" style={styles} />
                  <br />
                  <label htmlFor="sex">Sex</label>
                  <br />
                  <Field as="select" name="sex">
                    <option value="">--</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  <ErrorMessage name="breed" component="div" style={styles} />
                  <br />

                  <label htmlFor="color">Color</label>
                  <br />
                  <Field type="text" name="color" placeholder="Black" />
                  <ErrorMessage name="color" component="div" style={styles} />
                  <br />
                  <label htmlFor="mark">Identification Mark</label>
                  <br />
                  <Field
                    type="text"
                    name="mark"
                    placeholder="With white collar"
                  />
                  <ErrorMessage name="mark" component="div" style={styles} />
                  <br />
                  <label htmlFor="reward">Reward</label>
                  <br />
                  <p className={classes.reward}>(If any)</p>
                  <Field type="number" name="reward" placeholder="1000" />
                  <br />
                  <label htmlFor="image">Pet Image</label>
                  <br />
                  <p className={classes.petImage}>(Drag and drop or)</p>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={(event) => {
                      let uploadedFile;
                      if (event.target.files && event.target.files[0]) {
                        uploadedFile = event.target.files[0];
                        setFile(uploadedFile);
                        setFieldValue("file", event.target.files[0]);
                      }
                    }}
                  />
                  <ErrorMessage name="file" component="div" style={styles} />
                  <br />
                  {imageUrl && (
                    <div className={classes.petImage}>
                      <img
                        src={imageUrl}
                        alt="lost pet image"
                        width={200}
                        height="auto"
                      />
                    </div>
                  )}
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="dark">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Wrapper>
  );
};

export default LostForm;
