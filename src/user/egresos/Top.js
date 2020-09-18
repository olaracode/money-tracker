import React, { useState, useEffect } from "react";
import { Button, Card, Grid, Modal } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Add from "./Add";

function Top(props) {
  const [open, setOpen] = useState(false);
  const [ingresosTotales, setIngresosTotales] = useState(null);
  useEffect(() => {
    setIngresosTotales(props.ingresosTotales);
  }, [props.ingresosTotales]);
  return (
    <div>
      <Grid container spacing={10}>
        <Grid item xs={12} sm={5}>
          <Card>
            <h3>Egresos Totales</h3>
            <h4 className="ingresosTop">{ingresosTotales}</h4>
          </Card>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card>
            <h3>Egresos Mensuales</h3>
            <h4 className="ingresosTop">{props.ingresosMes}</h4>
          </Card>
        </Grid>
        <Grid item xs={12} sm={2}>
          <div className="addButtonContainer">
            <Button onClick={() => setOpen(true)} className="fabBoton">
              <AddIcon />
              Egreso
            </Button>
          </div>
        </Grid>
      </Grid>
      <Modal open={open}>
        <>
          <Add handleClose={() => setOpen()} />
        </>
      </Modal>
    </div>
  );
}

export default Top;
