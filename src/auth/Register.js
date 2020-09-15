import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import "./Login.css";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import ErrorHandle from "../misc/ErrorHandle";

function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState();
  const [username, setUsername] = useState();
  const [sexo, setSexo] = useState("");
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  let history = useHistory();
  // if (setUserData) history.push("user");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, password, passwordCheck, username, sexo };
      console.log(newUser);
      await axios.post("http://localhost:5000/users/registro", newUser);
      const loginRes = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/user");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div>
      <div className="Body">
        <div className="cardContainer">
          <Card className="card" variant="outlined">
            <h3 className="formHeader">Registro de usuario</h3>
            <form onSubmit={handleSubmit}>
              <div className="formItem">
                <TextField
                  onChange={(e) => setUsername(e.target.value)}
                  className="textField"
                  id="outlined-basic"
                  label="Alias del usuario"
                  variant="outlined"
                />
              </div>
              <div className="formItem">
                <TextField
                  onChange={(e) => setEmail(e.target.value)}
                  className="textField"
                  id="outlined-basic"
                  label="Correo Electronico"
                  variant="outlined"
                />
              </div>
              <div className="formItem">
                <TextField
                  onChange={(e) => setPassword(e.target.value)}
                  className="textField"
                  id="outlined-basic"
                  type="password"
                  label="Confirme contraseña"
                  variant="outlined"
                />
              </div>
              <div className="formItem">
                <TextField
                  onChange={(e) => setPasswordCheck(e.target.value)}
                  className="textField"
                  id="outlined-basic"
                  type="password"
                  label="Confirme contraseña"
                  variant="outlined"
                />
              </div>
              <div className="formItem">
                <FormControl variant="outlined" className="textField">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Sexo
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Age"
                    onChange={(e) => setSexo(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>Ninguno</em>
                    </MenuItem>
                    <MenuItem value={"Mujer"}>Mujer</MenuItem>
                    <MenuItem value={"Hombre"}>Hombre</MenuItem>
                    <MenuItem value={"Otro"}>Otro</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div></div>
              <div className="formItem">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  className="textField"
                  startIcon={<SaveIcon />}
                >
                  Enviar
                </Button>
              </div>
              {error && (
                <div className="formItem">
                  <ErrorHandle message={error} />
                </div>
              )}
              <div className="formItem">
                ¿Ya tienes una cuenta?
                <Link to="/login">Ingresa ahora</Link>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Register;
