import React, { useState, useEffect, useContext } from "react";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import "./egresos.css";
import Top from "./Top";
import UserContext from "../../context/UserContext";
import Graficos from "./Graficos";

function Egresos() {
  const { userData } = useContext(UserContext);
  const [egresosTotales, setEgresosTotales] = useState();
  const [egresosMesCategorias, setEgresosMesCategorias] = useState();
  const [egresosTotalesCategorias, setEgresosTotalesCategorias] = useState();
  const [egresosMensuales, setEgresosMensuales] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAll = async () => {
      let token = localStorage.getItem("auth-token");
      const getEgresos = await axios.get(
        "http://localhost:5000/users/egresos",
        {
          headers: { "auth-token": token },
        },
        []
      );
      const getMesCategorias = await axios.get(
        "http://localhost:5000/users/egresos/mes/categoria",
        {
          headers: { "auth-token": token },
        },
        []
      );
      const getCategorias = await axios.get(
        "http://localhost:5000/users/egresos/categoria",
        {
          headers: { "auth-token": token },
        },
        []
      );
      const getMensuales = await axios.get(
        "http://localhost:5000/users/egresos/mensuales",
        {
          headers: { "auth-token": token },
        },
        []
      );
      let montoI = 0;
      getEgresos.data.map((egreso) => {
        return (montoI += egreso.monto);
      });
      setEgresosTotales(montoI);
      setEgresosMesCategorias(getMesCategorias.data);
      setEgresosTotalesCategorias(getCategorias.data);
      setEgresosMensuales(getMensuales.data);
      setIsLoading(false);
    };
    getAll();
  }, []);
  const egresosMes = userData.user.egresosMes;

  return (
    <div className="ingresosBody">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Top ingresosMes={egresosMes} ingresosTotales={egresosTotales} />
          <Graficos
            backgroundColor={[
              "#EF9A9A",
              "#EF5350",
              "#F44336",
              "#E53935",
              "#D32F2F",
              "#C62828",
              "#B71C1C",
            ]}
            texto={{ totales: "Egresos Totales", mes: "Egresos del Mes" }}
            categorias={[
              "Renta",
              "Servicios",
              "Comida",
              "Lujos",
              "Metas",
              "Salidas",
              "Miscelaneos",
            ]}
            renta={{
              mes: egresosMesCategorias.renta,
              totales: egresosTotalesCategorias.renta,
            }}
            servicios={{
              mes: egresosMesCategorias.servicios,
              totales: egresosTotalesCategorias.servicios,
            }}
            comida={{
              mes: egresosMesCategorias.comida,
              totales: egresosTotalesCategorias.comida,
            }}
            lujos={{
              mes: egresosMesCategorias.lujos,
              totales: egresosTotalesCategorias.lujos,
            }}
            metas={{
              mes: egresosMesCategorias.metas,
              totales: egresosTotalesCategorias.metas,
            }}
            salidas={{
              mes: egresosMesCategorias.salidas,
              totales: egresosTotalesCategorias.salidas,
            }}
            miscelaneos={{
              mes: egresosMesCategorias.miscelaneos,
              totales: egresosTotalesCategorias.miscelaneos,
            }}
            linea={egresosMensuales}
            lineaTexto={"Egresos del año"}
          />
        </>
      )}
    </div>
  );
}
export default Egresos;
