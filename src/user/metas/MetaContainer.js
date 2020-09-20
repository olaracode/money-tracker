import React from "react";
import { Button, Card, Grid, LinearProgress } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

function MetaContainer(props) {
  const progress = (props.pago * 100) / props.monto;
  return (
    <div className="progresoMetasContainer">
      <Card className="progresoCardContainer">
        <Grid className="metasGridContainer" container>
          <Grid item sm={12}>
            <h3 className="tituloMetas">
              {props.nombre} - {props.pago}$/{props.monto}$
            </h3>
          </Grid>
          <Grid item xs={12} sm={12}>
            <div className="barraProgreso">
              <LinearProgress variant="determinate" value={progress} />
            </div>
          </Grid>
          <Grid item xs={6} sm={6}>
            <div className="metaButton">
              <Button className="editButton" variant="contained">
                <EditIcon />
                Editar
              </Button>
            </div>
          </Grid>
          <Grid item xs={6} sm={6}>
            <div className="metaButton">
              <Button variant="contained" color="primary">
                <AddIcon /> Pago
              </Button>
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default MetaContainer;
