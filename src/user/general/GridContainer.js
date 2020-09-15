import React from "react";
import { Grid, Card, CircularProgress } from "@material-ui/core";

function GridContainer(props) {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item sm={4} xs={12}>
          <Card>
            <h3>Ingresos del mes</h3>
            {props.isLoading ? (
              <div className="spinner">
                <CircularProgress />
              </div>
            ) : (
              <>
                <h3 className="ingresos">{props.ingresosMes}</h3>
                <p className="lastInput">
                  Ultimo ingreso:
                  {props.ultIngreso.monto} - {props.ultIngreso.fecha.dia}/
                  {props.ultIngreso.fecha.mes}/{props.ultIngreso.fecha.ano}
                </p>
              </>
            )}
          </Card>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Card>
            <h3>Egresos del mes</h3>
            {props.isLoading ? (
              <div className="spinner">
                <CircularProgress color="secondary" />
              </div>
            ) : (
              <>
                <h3 className="egresos">{props.egresosMes}</h3>
                <p className="lastInput">
                  Ultimo ingreso:
                  {props.ultEgreso.monto} - {props.ultEgreso.fecha.dia}/
                  {props.ultEgreso.fecha.mes}/{props.ultEgreso.fecha.ano}
                </p>
              </>
            )}
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
