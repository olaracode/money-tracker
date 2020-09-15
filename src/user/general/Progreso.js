import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./general.css";
import { Paper } from "@material-ui/core";

function Progreso() {
  return (
    <div className="progressContainer">
      <Paper elevation="3">
        <h3 className="progressTitulo">Metas</h3>
        <div className="linearContainer">
          <h5>Meta miscelanea</h5>
          <LinearProgress
            className="linearProgress"
            variant="determinate"
            value={30}
          />
        </div>
        <div className="linearContainer">
          <h5>Meta miscelanea</h5>
          <LinearProgress
            className="linearProgress"
            variant="determinate"
            value={30}
          />
        </div>
        <div className="linearContainer">
          <h5>Meta miscelanea</h5>
          <LinearProgress
            className="linearProgress"
            variant="determinate"
            value={30}
          />
        </div>
      </Paper>
    </div>
  );
}

export default Progreso;
