import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import LandingPage from "./LandingPage";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Navbar from "./Navbar";
import UserContext from "./context/UserContext";
import General from "./user/general/General";
import Ingresos from "./user/Ingresos/Ingresos";
import Egresos from "./user/Egresos";
import Metas from "./user/Metas";
import {  LinearProgress } from "@material-ui/core";
import "./loader.css";
import UserNav from "./user/UserNav";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [isLoading, setLoad] = useState(true);
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/users/", {
          headers: { "auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
      setLoad(false);
    };
    checkLoggedIn();
  }, []);
  return (
    <div>
      {isLoading ? (
        <div className="progreso">
          <div className="progresoContainer">
            <p className="progresop">Cargando</p>
            <LinearProgress />
          </div>
        </div>
      ) : (
        <BrowserRouter>
          <UserContext.Provider value={{ userData, setUserData }}>
            {!userData.token ? (
              <>
                <Navbar />
                <Switch>
                  <Route exact path="/" component={LandingPage} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                </Switch>
              </>
            ) : (
              <>
                <UserNav />
                <Switch>
                  <Route exact path="/" component={General} />
                  <Route path="/ingresos" component={Ingresos} />
                  <Route path="/egresos" component={Egresos} />
                  <Route path="/metas" component={Metas} />

                  <Redirect from="/login" to="/" component={Login} />
                  <Redirect from="/register" to="/" component={Register} />
                </Switch>
              </>
            )}
          </UserContext.Provider>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
