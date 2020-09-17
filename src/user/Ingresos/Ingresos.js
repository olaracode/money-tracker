import React, { useState, useEffect, useContext } from "react";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import "./ingresos.css";
import Top from "./Top";
import UserContext from "../../context/UserContext";
import Graficos from "./Graficos";

function Ingresos() {
  const { userData } = useContext(UserContext);
  const [ingresosTotales, setIngresosTotales] = useState();
  const [ingresosMesCategorias, setIngresosMesCategorias] = useState();
  const [ingresosTotalesCategorias, setIngresosTotalesCategorias] = useState();
  const [ingresosMensuales, setIngresosMensuales] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
      const getMesCategorias = await axios.get(
        "http://localhost:5000/users/ingresos/mes/categoria",
        {
          headers: { "auth-token": token },
        },
        []
      );
      const getCategorias = await axios.get(
        "http://localhost:5000/users/ingresos/categoria",
        {
          headers: { "auth-token": token },
        },
        []
      );
      const getMensuales = await axios.get(
        "http://localhost:5000/users/ingresos/mensuales",
        {
          headers: { "auth-token": token },
        },
        []
      );
      let montoI = 0;
      getIngresos.data.map((ingreso) => {
        return (montoI += ingreso.monto);
      });
      setIngresosTotales(montoI);
      setIngresosMesCategorias(getMesCategorias.data);
      setIngresosTotalesCategorias(getCategorias.data);
      setIngresosMensuales(getMensuales.data);
      setIsLoading(false);
    };
    getAll();
  }, []);
  const ingresosMes = userData.user.ingresosMes;

  return (
    <div className="ingresosBody">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Top ingresosMes={ingresosMes} ingresosTotales={ingresosTotales} />
          <Graficos
            backgroundColor={["#173F5F", "#20639B", "#3CAEA3", "ED553B"]}
            texto={{ totales: "Ingresos Totales", mes: "Ingresos del Mes" }}
            categorias={["Salario", "Bienes Raices", "Ventas", "Miscelaneos"]}
            salario={{
              mes: ingresosMesCategorias.salario,
              totales: ingresosTotalesCategorias.salario,
            }}
            bienesRaices={{
              mes: ingresosMesCategorias.bienesRaices,
              totales: ingresosTotalesCategorias.bienesRaices,
            }}
            ventas={{
              mes: ingresosMesCategorias.ventas,
              totales: ingresosTotalesCategorias.ventas,
            }}
            miscelaneos={{
              mes: ingresosMesCategorias.miscelaneos,
              totales: ingresosTotalesCategorias.miscelaneos,
            }}
            linea={ingresosMensuales}
            lineaTexto={"Ingresos del año"}
          />
        </>
      )}
    </div>
  );
}
export default Ingresos;
