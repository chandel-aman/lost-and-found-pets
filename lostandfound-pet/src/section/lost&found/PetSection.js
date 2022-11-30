import Card from "../../shared/UI/Card/Card";
import PetContainer from "../../shared/UI/PetContainer/PetContainer";
import classes from "./PetSection.module.css";

const PetSection = (props) => {
  return (
    <div className={classes.foundContainer}>
      {props.pets &&
        props.pets.map((pet) => {
          if (pet.lost)
            return (
              <Card key={`${Math.random() * 100}${pet.petType}_${pet.breed}`}>
                <PetContainer pet={pet} btnTxt={props.btnTxt} />
              </Card>
            );
        })}
    </div>
  );
};

export default PetSection;
