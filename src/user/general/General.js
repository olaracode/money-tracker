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
  const [isLoading, setLoading] = useState(true);

  const [dataIngresos, setDataI] = useState();
  const [dataEgresos, setDataE] = useState();
  const [metas, setMetas] = useState();

  useEffect(() => {
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
      const getMetas = await axios.get(
        "http://localhost:5000/users/metas",
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
      setMetas(getMetas.data);
      console.log(getMetas);
      setLoading(false);
    };
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
            />
          </div>

          <div className="BarContainer">
            <Paper elevation={3}>
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
            <Progreso metas={metas} />
          </div>
        </>
      )}
    </div>
  );
}

export default General;
