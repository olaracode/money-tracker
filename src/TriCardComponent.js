import React from "react";
import { Grid, Paper } from "@material-ui/core";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import AirplayIcon from "@material-ui/icons/Airplay";
import diseño from "./images/Diseño.png";

function TriCardComponent() {
  return (
    <div className="triCardComponent">
      <Grid container spacing={3}>
        <Grid item className="tricardCard" xs={12} sm={6}>
          <Paper elevation={3}>
            <AccountBalanceIcon className="tricardIcon" />
            <h3 className="tricardH3">
              Tu economia de hoy define tus riquezas mañana
            </h3>
            <p className="tricardP">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
          </Paper>
        </Grid>
        <Grid item className="tricardCard" xs={12} sm={6}>
          <Paper elevation={3}>
            <AttachMoneyIcon className="tricardIcon" />
            <h3 className="tricardH3">
              Controla tus egresos de una manera sencilla
            </h3>
            <p className="tricardP">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
          </Paper>
        </Grid>
        <Grid item className="tricardCard" xs={12} sm={6}>
          <Paper elevation={3}>
            <HourglassEmptyIcon className="tricardIcon" />
            <h3 className="tricardH3">Define y alcanza tus metas</h3>
            <p className="tricardP">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} className="tricardCard">
          <Paper elevation={3}>
            <AirplayIcon className="tricardIcon"/>
            <h3 className="tricardH3">Diseño simple, poder ilimitado</h3>
            <p className="tricardP">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
          </Paper>
        </Grid>
        <Grid xs={12} sm={12} className="triCardDiseño">
          <Paper elevation={3}>
            <img src={diseño} alt="" className="triCardImage" />
          </Paper>
        </Grid>
      </Grid>
      <svg
        className="triCardBlob"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="5%" stop-color="#023960" />
            <stop offset="95%" stop-color="#541840" />
          </linearGradient>
        </defs>
        <path
          fill="url(#gradient)"
          d="M36.1,-66.4C42.7,-58.7,41.3,-40.8,44.6,-28.1C48,-15.3,56.2,-7.7,57.7,0.8C59.1,9.3,53.8,18.7,49.9,30.5C46,42.3,43.4,56.6,35.4,65.3C27.3,74.1,13.6,77.3,0.5,76.5C-12.7,75.7,-25.5,71,-39.3,65.5C-53.1,60,-67.9,53.9,-75.2,42.9C-82.5,31.9,-82.3,15.9,-77.4,2.8C-72.6,-10.3,-63.1,-20.7,-53,-26.8C-42.8,-32.8,-32,-34.7,-23,-41C-14.1,-47.3,-7,-58.1,3.8,-64.8C14.7,-71.4,29.5,-74,36.1,-66.4Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  );
}

export default TriCardComponent;
