import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./general.css";
import { Paper } from "@material-ui/core";

function Progreso(props) {
  return (
    <div className="progressContainer">
      <Paper elevation={3}>
        <h3 className="progressTitulo">Metas</h3>
        {props.metas.map((meta) => {
          return (
            <div key={meta._id} className="linearContainer">
              <h5>{meta.nombre}</h5>
              <LinearProgress
                className="linearProgress"
                variant="determinate"
                value={(meta.pagos * 100) / meta.monto}
              />
            </div>
          );
        })}
      </Paper>
    </div>
  );
}

export default Progreso;
