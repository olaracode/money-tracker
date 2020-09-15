import React, { useContext, useState } from "react";
import Card from "@material-ui/core/Card";
import UserContext from "../context/UserContext";
import TextField from "@material-ui/core/TextField";
import "./Login.css";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import ErrorHandle from "../misc/ErrorHandle";

function Login() {
  const { setUserData } = useContext(UserContext);
  let history = useHistory();
  // if (setUserData) history.push("user");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div>
      <div className="Body">
        <div className="cardContainer">
          <Card className="card" variant="outlined">
            <h3 className="formHeader">Ingresa</h3>
            <form onSubmit={handleSubmit}>
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
                  label="Contraseña"
                  variant="outlined"
                />
              </div>
              <div className="formItem">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  className="textField"
                >
                  Enviar
                </Button>
              </div>
            </form>
            {error && (
              <div className="formItem">
                <ErrorHandle message={error} />
              </div>
            )}
            <div className="formItem">
              ¿Aun no está registrado?
              <Link to="/register">Registrate ahora</Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default Login;
