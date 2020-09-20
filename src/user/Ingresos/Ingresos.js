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
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);
  const [isLoading4, setIsLoading4] = useState(true);

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
      let montoI = 0;
      getIngresos.data.map((ingreso) => {
        return (montoI += ingreso.monto);
      });
      setIngresosTotales(montoI);
      setIsLoading1(false);
    };
    getAll();
  });
  useEffect(() => {
    const getCatMes = async () => {
      let token = localStorage.getItem("auth-token");
      const getMesCategorias = await axios.get(
        "http://localhost:5000/users/ingresos/mes/categoria",
        {
          headers: { "auth-token": token },
        },
        []
      );
      setIngresosMesCategorias(getMesCategorias.data);
      setIsLoading2(false);
    };
    getCatMes();
  }, []);
  useEffect(() => {
    const getCatTotal = async () => {
      let token = localStorage.getItem("auth-token");
      const getCategorias = await axios.get(
        "http://localhost:5000/users/ingresos/categoria",
        {
          headers: { "auth-token": token },
        },
        []
      );
      setIngresosTotalesCategorias(getCategorias.data);
      setIsLoading3(false);
    };
    getCatTotal();
  }, []);
  useEffect(() => {
    const getMes = async () => {
      let token = localStorage.getItem("auth-token");
      const getMensuales = await axios.get(
        "http://localhost:5000/users/ingresos/mensuales",
        {
          headers: { "auth-token": token },
        },
        []
      );
      setIngresosMensuales(getMensuales.data);
      setIsLoading4(false);
    };
    getMes();
  }, []);
  const ingresosMes = userData.user.ingresosMes;

  return (
    <div className="ingresosBody">
      {isLoading1 | isLoading2 | isLoading3 | isLoading4 ? (
        <div className="spinnerGeneral">
          <CircularProgress />
        </div>
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
