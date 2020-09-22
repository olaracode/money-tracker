import React, { useContext } from "react";
import UserContext from "./context/UserContext";
import "./landingPage.css";
import Button from "@material-ui/core/Button";
import logo from "./images/Untitled.png";
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
        <h3 className="especialH3">
          Has que tu economia vuele con Money Comet
        </h3>
        <p className="especialP">
          Tener el control de tus gastos te va a hacer llegar hasta las
          estrellas
        </p>
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
      <svg
        className="wave"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#fff"
          fill-opacity="1"
          d="M0,192L48,213.3C96,235,192,277,288,282.7C384,288,480,256,576,208C672,160,768,96,864,101.3C960,107,1056,181,1152,202.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}

export default LandingHeader;
