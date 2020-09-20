import React, { useState } from "react";
import { Button, Card, TextField } from "@material-ui/core";
import { CancelPresentation } from "@material-ui/icons";
import "./metas.css";
import axios from "axios";
import ErrorHandle from "../../misc/ErrorHandle";

function NuevoPago(props) {
  const [monto, setMonto] = useState();
  const [error, setError] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("auth-token");
    try {
      const nuevoPago = {
        monto,
      };
      await axios.post(props.ruta, nuevoPago, {
        headers: { "auth-token": token },
      });
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div className="nuevaMetaContainer">
      <Card>
        <div className="botonSalida">
          <CancelPresentation onClick={() => props.handleClose(false)} />
        </div>
        <h3>Nuevo Pago</h3>
        <h3>Resta Cancelar: {props.monto - props.pagos}</h3>
        <form onSubmit={handleSubmit} className="nuevaMetaForm">
          <div className="nuevaMetaInputFields">
            <TextField
              id="filled-number"
              label="Monto"
              type="number"
              variant="filled"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
          </div>
          {error && (
            <div className="metasErrorHandler">
              <ErrorHandle className="metasErrorHandler" message={error} />
            </div>
          )}
          <div className="submitContainer">
            <Button color="primary" variant="contained" type="submit">
              Guardar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default NuevoPago;
