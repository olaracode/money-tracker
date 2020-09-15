import React, { useContext } from "react";
import UserContext from "./context/UserContext";
import "./landingPage.css";
import Button from "@material-ui/core/Button";
import logo from "./images/Untitled1.png";
import { Link } from "react-router-dom";

function LandingHeader() {
  let route;
  const { userData } = useContext(UserContext);
  if (userData.token === undefined) {
    route = "/register";
  } else {
    route = "/user";
  }

  return (
    <div className="image">
      <div className="imageContainer">
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div className="botonContainer">
        <Link to={route}>
          <Button
            className="boton"
            variant="contained"
            color="primary"
            disableElevation
          >
            Comienza ahora
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default LandingHeader;
