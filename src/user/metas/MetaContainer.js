import React, { useState } from "react";
import { Button, Card, Grid, LinearProgress, Modal } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import NuevoPago from "./NuevoPago";
import EditarMeta from "./EditarMeta";

function MetaContainer(props) {
  const [isOpen, setisOpen] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const progress = (props.meta.pagos * 100) / props.meta.monto;
  return (
    <div className="progresoMetasContainer">
      <Card className="progresoCardContainer">
        <Grid className="metasGridContainer" container>
          <Grid item sm={12}>
            <h3 className="tituloMetas">
              {props.meta.nombre} - {props.meta.pagos}$/{props.meta.monto}$
            </h3>
          </Grid>
          <Grid item xs={12} sm={12}>
            <div className="barraProgreso">
              <LinearProgress variant="determinate" value={progress} />
            </div>
          </Grid>
          <Grid item xs={6} sm={6}>
            <div className="metaButton">
              <Button
                onClick={() => setisEdit(true)}
                className="editButton"
                variant="contained"
              >
                <EditIcon />
                Editar
              </Button>
            </div>
          </Grid>
          <Grid item xs={6} sm={6}>
            <div className="metaButton">
              <Button
                onClick={() => setisOpen(true)}
                variant="contained"
                color="primary"
              >
                <AddIcon /> Pago
              </Button>
            </div>
          </Grid>
        </Grid>
      </Card>
      <Modal open={isOpen}>
        <NuevoPago
          handleClose={() => setisOpen()}
          ruta={`http://localhost:5000/users/meta/pago/${props.meta._id}`}
          monto={props.meta.monto}
          pagos={props.meta.pagos}
        />
      </Modal>
      <Modal open={isEdit}>
        <EditarMeta
          handleClose={() => setisEdit()}
          ruta={`http://localhost:5000/users/meta/editar/${props.meta._id}`}
          meta={props.meta}
        />
      </Modal>
    </div>
  );
}

export default MetaContainer;
