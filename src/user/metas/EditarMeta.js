import React, { useState } from "react";
import { Button, Card, TextField } from "@material-ui/core";
import { CancelPresentation } from "@material-ui/icons";
import ErrorHandle from "../../misc/ErrorHandle";
import axios from "axios";

function EditarMeta(props) {
  const [nombre, setNombre] = useState(props.meta.nombre);
  const [monto, setMonto] = useState(props.meta.monto);
  const [descripcion, setDescripcion] = useState(props.meta.descripcion);
  const [error, setError] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("auth-token");
    try {
      const metaEditada = {
        nombre,
        monto,
        descripcion,
      };
      await axios.post(props.ruta, metaEditada, {
        headers: { "auth-token": token },
      });
      props.handleClose(false);
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div>
      <div className="nuevaMetaContainer">
        <Card>
          <div className="botonSalida">
            <CancelPresentation onClick={() => props.handleClose(false)} />
          </div>
          <h3>Editar Meta</h3>
          <h3>
            {props.meta.nombre} - {props.meta.monto}
          </h3>
          <h3>{props.meta.descripcion}</h3>
          <form onSubmit={handleSubmit} className="nuevaMetaForm">
            <div className="nuevaMetaInputFields">
              <TextField
                id="filled-number"
                label="Nombre"
                type="text"
                variant="filled"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
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
            <div className="nuevaMetaInputFields">
              <TextField
                id="filled-number"
                label="Descripcion"
                multiline
                rows={4}
                variant="filled"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
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
    </div>
  );
}

export default EditarMeta;
