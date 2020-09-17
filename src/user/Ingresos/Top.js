import React, { useState } from "react";
import { Button, Card, Grid, Modal } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Add from "./Add";

function Top(props) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Grid container spacing={10}>
        <Grid item xs={12} sm={5}>
          <Card>
            <h3>Ingresos Totales</h3>
            <h4 className="ingresosTop">{props.ingresosTotales}</h4>
          </Card>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card>
            <h3>Ingresos Mensuales</h3>
            <h4 className="ingresosTop">{props.ingresosMes}</h4>
          </Card>
        </Grid>
        <Grid item xs={12} sm={2}>
          <div className="addButtonContainer">
            <Button onClick={() => setOpen(true)} className="fabBoton">
              <AddIcon />
              Ingreso
            </Button>
          </div>
        </Grid>
      </Grid>
      <Modal open={open}>
        <>
          <Add
            handleClose={() => setOpen()}
            categoria={[
              {
                salario: "Salario",
                bienesRaices: "Bienes Raices",
                ventas: "Ventas",
                miscelaneos: "Miscelaneos",
              },
            ]}
          />
        </>
      </Modal>
    </div>
  );
}

export default Top;
