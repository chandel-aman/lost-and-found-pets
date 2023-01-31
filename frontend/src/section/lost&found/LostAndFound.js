import { useEffect, useState } from "react";

import PetSection from "./PetSection";
import ErrorModal from "../../shared/UI/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/UI/Loading/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { usePetData } from "../../shared/hooks/pet-hook";
import Card from "../../shared/UI/Card/Card";

import classes from "./LostAndFound.module.css";

const LostAndFound = () => {
  const [loadedPets, setLoadedPets] = useState();
  const { error, isLoading, clearError } = useHttpClient();
  const { pets } = usePetData();

  useEffect(() => {
    if (pets) {
      setLoadedPets(pets);
    }
  }, [pets]);
  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {isLoading && <LoadingSpinner />}
      <div className={classes.lfSection}>
        <h2>Lost Pets</h2>
        <div>
          {!isLoading && loadedPets ? (
            <PetSection pets={loadedPets} btnTxt="View" />
          ) : (
            <Card>
              <h2>No pets found yet!</h2>
            </Card>
          )}
        </div>
        {/* <h2>Lost Pets</h2>
        <div>
          <PetSection pets={loadedPets} btnTxt="View" />
        </div> */}
      </div>
    </>
  );
};

export default LostAndFound;
