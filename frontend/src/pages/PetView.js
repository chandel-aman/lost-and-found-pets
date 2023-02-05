import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useHttpClient } from "../shared/hooks/http-hook";

import Button from "../shared/UI/Button/Button";
import Wrapper from "../shared/UI/Wrapper";
import LoadingSpinner from "../shared/UI/Loading/LoadingSpinner";
import ErrorModal from "../shared/UI/ErrorModal/ErrorModal";

import classes from "./PetView.module.css";

const PetView = () => {
  const navigate = useNavigate();
  const [loadedPet, setloadedPet] = useState();
  const { sendRequest, error, isLoading, clearError } = useHttpClient();

  const petId = useParams().petId;

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/pet/` + `${petId}`
        );
        const pet = await responseData.pet;
        setloadedPet(pet);
      } catch (error) {}
    };
    fetchPetDetails();
  }, [sendRequest]);

  let imageURL, bgURL;
  if (!isLoading && loadedPet) {
    imageURL = `${process.env.REACT_APP_BACKEND_URL}/` + `${loadedPet.file}`;
    bgURL =
      `${process.env.REACT_APP_BACKEND_URL}/uploads/images/` +
      loadedPet.file.substring(15);
  }

  const deletePetHandler = async () => {
    //deleting the pet form the database
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/pet/` + `${petId}`,
        "DELETE"
      );
    } catch (error) {
      console.log(error);
    }
    navigate(-1);
  };

  return (
    <Wrapper>
      {/* {error && <ErrorModal error={error} onClear={clearError} />} */}
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedPet && (
        <>
          <div
            className={classes.bgImage}
            style={{
              backgroundImage: `url(${bgURL})`,
            }}
          />
          <div className={classes.petView}>
            <div className={classes.petPicture}>
              <div className={classes.imageContainer}>
                <img
                  src={imageURL}
                  alt={`${loadedPet.petType} ${loadedPet.breed}`}
                />
              </div>
            </div>
            <div className={classes.info}>
              <div className={classes.details}>
                <div className={classes.petInfo}>
                  <h3>Pet Details</h3>
                  <b>
                    <p>{loadedPet.petType}</p>
                  </b>
                  <p>Breed: {loadedPet.breed}</p>
                  <p>Sex: {loadedPet.sex}</p>
                  <p>Color: {loadedPet.color}</p>
                  {loadedPet.mark && (
                    <p>Identification Mark: {loadedPet.mark}</p>
                  )}
                </div>
                <hr />
                <div className={classes.ownerInfo}>
                  <h3>Owner Details</h3>
                  <p>
                    Name: {loadedPet.firstName} {loadedPet.lastName}
                  </p>
                  <p>Phone: {loadedPet.phone}</p>
                  <p>Address: {loadedPet.address}</p>
                  <p>Email: {loadedPet.email}</p>
                  <b>
                    <p>Reward: {loadedPet.reward}</p>
                  </b>
                </div>
              </div>
              <div className={classes.petAction}>
                <Button className="light" onClick={deletePetHandler}>
                  Report Found
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default PetView;
