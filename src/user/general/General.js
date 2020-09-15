import React, { useContext, useState, useEffect } from "react";
import { Card, CircularProgress, Grid } from "@material-ui/core";
import "./general.css";
import UserContext from "../../context/UserContext";
import axios from "axios";
import GridContainer from "./GridContainer";
import BarGraphs from "./BarGraphs";

function General() {
  const { userData } = useContext(UserContext);
  const [ultIngreso, setIngreso] = useState();
  const [ultEgreso, setEgreso] = useState();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const getLasts = async () => {
      let token = localStorage.getItem("auth-token");
      const getlastingreso = await axios.get(
        "http://localhost:5000/users/ingreso/ultimo",
        {
          headers: { "auth-token": token },
        },
        []
      );
      const getlastegreso = await axios.get(
        "http://localhost:5000/users/egresos/ultimo",
        {
          headers: { "auth-token": token },
        },
        []
      );
      setIngreso(getlastingreso.data);
      setEgreso(getlastegreso.data);
      setLoading(false);
    };
    getLasts();
  }, []);

  const ingresosMes = userData.user.ingresosMes;
  const egresosMes = userData.user.egresosMes;
  const saldo = userData.user.saldo;

  return (
    <div className="body">
      <div className="cardContainer">
        <GridContainer
          isLoading={isLoading}
          ingresosMes={ingresosMes}
          egresosMes={egresosMes}
          saldo={saldo}
          ultIngreso={ultIngreso}
          ultEgreso={ultEgreso}
        />
        <div className="BarContainer">
          <BarGraphs ingresosMes={ingresosMes} egresosMes={egresosMes} />
        </div>
      </div>
    </div>
  );
}

export default General;
