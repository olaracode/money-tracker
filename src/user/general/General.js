import React, { useContext, useState, useEffect } from "react";
import { CircularProgress, Paper } from "@material-ui/core";
import "./general.css";
import UserContext from "../../context/UserContext";
import axios from "axios";
import GridContainer from "./GridContainer";
import BarGraphs from "./BarGraphs";
import Progreso from "./Progreso";

function General() {
  const { userData } = useContext(UserContext);
  const [ultIngreso, setIngreso] = useState();
  const [ultEgreso, setEgreso] = useState();
  const [isLoading, setLoading] = useState(true);

  const [dataIngresos, setDataI] = useState();
  const [dataEgresos, setDataE] = useState();

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
      if (getlastingreso.data === undefined) {
        setIngreso("No hay ingresos");
      }
      if (getlastegreso.data === undefined) {
        setIngreso("No hay egresos");
      }
      setIngreso(getlastingreso.data);
      setEgreso(getlastegreso.data);
      setLoading(false);
    };
    const getAll = async () => {
      let token = localStorage.getItem("auth-token");
      const getIngresos = await axios.get(
        "http://localhost:5000/users/ingresos",
        {
          headers: { "auth-token": token },
        },
        []
      );
      const getEgresos = await axios.get(
        "http://localhost:5000/users/egresos",
        {
          headers: { "auth-token": token },
        },
        []
      );
      let montoI = 0;
      let montoE = 0;
      getIngresos.data.map((ingreso) => {
        return (montoI += ingreso.monto);
      });
      getEgresos.data.map((egreso) => {
        return (montoE += egreso.monto);
      });
      setDataE(montoE);
      setDataI(montoI);
      console.log(montoE, montoI);
    };
    getLasts();
    getAll();
  }, []);

  const ingresosMes = userData.user.ingresosMes;
  const egresosMes = userData.user.egresosMes;
  const saldo = userData.user.saldo;

  return (
    <div className="body">
      {isLoading ? (
        <div className="spinnerGeneral">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="cardContainer">
            <GridContainer
              isLoading={isLoading}
              ingresosMes={ingresosMes}
              egresosMes={egresosMes}
              saldo={saldo}
              ultIngreso={ultIngreso}
              ultEgreso={ultEgreso}
            />
          </div>

          <div className="BarContainer">
            <Paper elevation="3">
              <BarGraphs
                isLoading={isLoading}
                ingresosMes={ingresosMes}
                egresosMes={egresosMes}
                dataIngresos={dataIngresos}
                dataEgresos={dataEgresos}
              />
            </Paper>
          </div>
          <div>
            <Progreso />
          </div>
        </>
      )}
    </div>
  );
}

export default General;
