import React, { useState } from "react";
import {
  Card,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import "./ingresos.css";
import axios from "axios";
import ErrorHandle from "../../misc/ErrorHandle";

function Add(props) {
  const [monto, setMonto] = useState(0);
  const [categoria, setCategoria] = useState(" ");
  const [descripcion, setDescripcion] = useState();
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("auth-token");
    try {
      const nuevoIngreso = {
        monto,
        categoria,
        descripcion,
      };
      await axios.post(
        "http://localhost:5000/users/ingreso/add",
        nuevoIngreso,
        {
          headers: { "auth-token": token },
        }
      );
      props.handleClose(false);
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div className="modalContainer">
      <Card>
        <div className="modalCard">
          <div className="botonSalida">
            <CancelPresentationIcon onClick={() => props.handleClose(false)} />
          </div>
          <form className="formContainer" onSubmit={handleSubmit}>
            <h3>Agregar nuevo ingreso</h3>
            <div className="inputContainer">
              <TextField
                id="filled-number"
                label="Monto"
                type="number"
                variant="filled"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
              />
            </div>
            <div className="inputContainer">
              <FormControl variant="filled" className="select">
                <InputLabel id="demo-simple-select-filled-label">
                  Categoria
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Salario"}>Salario</MenuItem>
                  <MenuItem value={"Bienes Raices"}>Bienes Raices</MenuItem>
                  <MenuItem value={"Ventas"}>Ventas</MenuItem>
                  <MenuItem value={"Miscelaneos"}>Miscelaneos</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="inputContainer">
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
            <div className="submitContainer">
              <Button color="primary" variant="contained" type="submit">
                Guardar
              </Button>
            </div>
          </form>
          {error && (
            <div>
              <ErrorHandle message={error} />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Add;
