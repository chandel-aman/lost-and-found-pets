import { useEffect, useState } from "react";

import { useHttpClient } from "../shared/hooks/http-hook";
import { usePetData } from "../shared/hooks/pet-hook";

import Button from "../shared/UI/Button/Button";
import PetContainer from "../shared/UI/PetContainer/PetContainer";
import Card from "../shared/UI/Card/Card";

import classes from "./Pets.module.css";

const Pets = () => {
  const [breeds, setBreeds] = useState();
  const [loadedPets, setLoadedPets] = useState();
  const [toggle, setToggle] = useState(false);
  const [type, setType] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [sex, setSex] = useState("");
  const [filter, setFilter] = useState({
    type: "",
    breed: "",
    sex: "",
  });
  const [filteredPets, setFilteredPets] = useState();

  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const { pets } = usePetData();

  //fetching the breeds of different pets
  useEffect(() => {
    const fetchUsers = async () => {
      let responseData;
      try {
        responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/breeds`
        );
        const data = await responseData.breeds[0].breeds;
        setBreeds(data);
      } catch (error) {}
    };
    fetchUsers();
  }, [sendRequest]);

  //fetching all the pets
  useEffect(() => {
    if (pets) {
      setLoadedPets(pets);
      setFilteredPets(pets);
    }
  }, [pets]);

  //function to toggle the breeds
  const toggleHandler = (e) => {
    if (e.target.id === "extend") {
      setToggle((prev) => !prev);
    }
  };

  const typeChangeHandler = (e) => {
    setType(e.target.value);
    setPetBreed("");
    setSex("");
  };

  const breedChangeHandler = (e) => setPetBreed(e.target.value);

  const sexChangeHandler = (e) => setSex(e.target.value);

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

  const filterPet = (pet) => {
    if (type && petBreed && sex) {
      if (type === pet.petType && petBreed === pet.breed && sex === pet.sex)
        return true;
    } else if ((type && petBreed) || (type && sex) || (petBreed && sex)) {
      if (
        (type === pet.petType || type === "all") &&
        (petBreed === pet.breed || petBreed === "all")
      )
        return true;
      if ((type === pet.petType || type === "all") && sex === pet.sex)
        return true;
      if ((petBreed === pet.breed || petBreed === "all") && sex === pet.sex)
        return true;
    } else if (type) return type === "all" ? true : type === pet.petType;
    else if (petBreed)
      return petBreed === "all" ? true : petBreed === pet.breed;
    else if (sex) return sex === pet.sex;
    else return false;
  };

  const filterChangeHandler = (e) => {
    e.preventDefault();
    setFilter({ type: "", breed: "", sex: "" });
    setFilter({
      type,
      breed: petBreed,
      sex,
    });
  };

  const searchHandler = (e) => {
    e.preventDefault();
    console.log("Searching...");
  };

  useEffect(() => {
    if (loadedPets) {
      if (filter.breed || filter.sex || filter.type) {
        const filteredData = loadedPets.filter(filterPet);
        setFilteredPets(filteredData);
        console.log(filter);
        if (filteredPets.length > 0) {
          console.log(filteredPets);
        } else {
          console.log("No result found!");
        }
      }
    }
  }, [filter]);

  return (
    <div className={classes.petsPage}>
      {/* <IonIcon name="filter-outline"/> */}
      <form onSubmit={filterChangeHandler} className={classes.petFilter}>
        <div className={classes.petType}>
          <span>Type</span>
          <br />
          <div onChange={typeChangeHandler}>
            <input type="radio" id="dog" value="dog" name="pet-type" />
            <label htmlFor="dog">Dog</label>
            <br />
            <input type="radio" id="cat" value="cat" name="pet-type" />
            <label htmlFor="cat">Cat</label>
            <br />
            <input type="radio" id="ham" value="ham" name="pet-type" />
            <label htmlFor="ham">Ham</label>
            <br />
            <input type="radio" id="other" value="other" name="pet-type" />
            <label htmlFor="other">Other</label>
            <br />
            <input type="radio" id="all" value="all" name="pet-type" />
            <label htmlFor="all">All</label>
            <br />
          </div>
        </div>
        <div onChange={breedChangeHandler} className={classes.petBreed}>
          <span>Breed</span>

          {/* might add a wraper around the breed and make overflow y to scroll */}
          {breed &&
            breed.map((p) => (
              <div key={`${type}_${p}`}>
                <input type="radio" id={p} value={p} name="pet-breed" />
                <label htmlFor={p}>{p}</label>
                <br />
              </div>
            ))}
          <input type="radio" id="other" value="other" name="pet-breed" />
          <label htmlFor="other">Other</label>
          <br />
          {(type === "dog" || type === "cat") && (
            <p id="extend" onClick={toggleHandler}>
              {!toggle ? "more" : "less"}
            </p>
          )}
        </div>
        <div onChange={sexChangeHandler} className={classes.petSex}>
          <span>Sex</span>
          <div>
            <input type="radio" id="male" value="male" name="pet-sex" />
            <label htmlFor="sex">Male</label>
            <br />
            <input type="radio" id="female" value="female" name="pet-sex" />
            <label htmlFor="sex">Female</label>
            <br />
          </div>
        </div>
        <Button type="submit" className="dark">
          Filter
        </Button>
      </form>

      {loadedPets && (
        <div className={classes["pet-container"]}>
          {/* <div>
          Search
          <form onSubmit={searchHandler}>
            <input type="text" />
            <button type="submit">Search</button>
          </form>
        </div> */}
          <div className={classes.pets}>
            {filteredPets.length > 0 &&
              filteredPets.map((pet) => {
                return (
                  <Card
                    key={`${Math.random() * 100}${pet.petType}_${pet.breed}`}
                  >
                    <PetContainer pet={pet} btnTxt={pet.lost ? "View" : ""} />
                  </Card>
                );
              })}
            {filteredPets.length === 0 && (
              <Card>
                <h2>No result found!</h2>
              </Card>
            )}
          </div>
          {/* <div>Pagination</div> */}
        </div>
      )}
    </div>
  );
};

export default Pets;
