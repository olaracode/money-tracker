import React, { useState } from "react";
import { Button, Card, TextField } from "@material-ui/core";
import CancelPresentation from "@material-ui/icons/CancelPresentation";
import "./metas.css";
import axios from "axios";
import ErrorHandle from "../../misc/ErrorHandle";
import { useHistory } from "react-router-dom";

function NuevaMeta(props) {
  const history = useHistory;
  const [nombre, setNombre] = useState();
  const [monto, setMonto] = useState();
  const [descripcion, setDescripcion] = useState();
  const [error, setError] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("auth-token");
    try {
      const nuevaMeta = {
        nombre,
        monto,
        descripcion,
      };
      await axios.post("http://localhost:5000/users/meta/add", nuevaMeta, {
        headers: { "auth-token": token },
      });
      props.handleClose(false);
      history.go(0);
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  console.log(error);
  return (
    <div className="nuevaMetaContainer">
      <Card>
        <div className="botonSalida">
          <CancelPresentation onClick={() => props.handleClose(false)} />
        </div>
        <h3>Nueva Meta</h3>
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
  );
}

export default NuevaMeta;
