import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import Button from "../../shared/UI/Button/Button";

import classes from "./Hero.module.css";

const Hero = () => {
  const navigate = useNavigate();
  const lostPetFormHandler = () => {
    navigate("/lostPetForm");
  };
  const findPetHandler = () => {
    navigate("/findPet");
  };
  return (
    <div className={classes.container}>
      <div className={classes.imgContainer}>
        <div className={classes.pawprint}>
          <FontAwesomeIcon
            className={classes.paw}
            icon={icon({ name: "paw", style: "solid" })}
            // size="3x"
          />
          <FontAwesomeIcon
            className={classes.paw}
            icon={icon({ name: "paw", style: "solid" })}
            // size="2x"
          />
          <FontAwesomeIcon
            className={classes.paw}
            icon={icon({ name: "paw", style: "solid" })}
            // size="1x"
          />
          <FontAwesomeIcon
            className={classes.paw}
            icon={icon({ name: "paw", style: "solid" })}
            // size="2x"
          />
          <FontAwesomeIcon
            className={classes.paw}
            icon={icon({ name: "paw", style: "solid" })}
            // size="3x"
          />
          <FontAwesomeIcon
            className={classes.paw}
            icon={icon({ name: "paw", style: "solid" })}
            // size="3x"
          />
          <FontAwesomeIcon
            className={classes.paw}
            icon={icon({ name: "paw", style: "solid" })}
            // size="1x"
          />
          <FontAwesomeIcon
            className={classes.paw}
            icon={icon({ name: "paw", style: "solid" })}
            // size="2x"
          />
        </div>
      </div>
      <div className={classes.textContainer}>
        <h1>Find Your Pet</h1>
        <p>
          Have you lost your pet, or have found one? Post it at
          <br />
          <b>
            <i> Lost & Found,</i>
          </b>
          <br />
          its free, and very easy to use!
        </p>
        <div className={classes.button}>
          <Button className="light" onClick={lostPetFormHandler}>
            Lost
          </Button>
          <Button className="dark" onClick={findPetHandler}>
            Find
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
