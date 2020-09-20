import React from "react";
import { Grid, Card } from "@material-ui/core";

function GridContainer(props) {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item sm={4} xs={12}>
          <Card>
            <h3>Ingresos del mes</h3>
            <>
              <h3 className="ingresos">{props.ingresosMes}</h3>
            </>
          </Card>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Card>
            <h3>Egresos del mes</h3>
            <>
              <h3 className="egresos">{props.egresosMes}</h3>
            </>
          </Card>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Card>
            <h3>Saldo</h3>
            <h3 className="saldo">{props.saldo}</h3>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default GridContainer;
