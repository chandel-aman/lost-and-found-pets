import { useNavigate } from "react-router-dom";

import Button from "../Button/Button";
import classes from "./PetContainer.module.css";

const PetContainer = (props) => {
  const { pet } = props;
  const navigate = useNavigate();
  const petViewHandler = () => {
    navigate(`/${pet.id}/viewPet`);
  };

  return (
    <div className={classes.petContainer}>
      <div className={classes.petImg}>
        <img src={"https://amused-cyan-shrimp.cyclic.app/" + `${pet.file}`} alt="pet" />
      </div>

      <h2>{pet.petName}</h2><span>({pet.petType})</span>
      <p>{pet.breed}</p>
      {pet.lost ? (
        <Button type="button" className="dark" onClick={petViewHandler}>
          {props.btnTxt}
        </Button>
      ) : (
        <p>Founded</p>
      )}
    </div>
  );
};

export default PetContainer;
