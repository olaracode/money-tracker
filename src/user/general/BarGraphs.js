import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

function BarGraphs(props) {
  const [dataIngresos, setDataI] = useState();
  const [dataEgresos, setDataE] = useState();

  const [isLoading, setisLoading] = useState(true);
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
      setisLoading(false);
      console.log(montoE, montoI);
    };
    getAll();
  }, []);

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        // <div>
        //   this
        //   {console.log(data)}
        // </div>

        <Bar
          data={{
            labels: ["Total", "Mensual"],
            datasets: [
              {
                label: "Ingresos",
                backgroundColor: "rgb(0, 224, 34)",
                borderColor: "rgb(0,0,0)",
                data: [dataIngresos, props.ingresosMes, 0],
              },
              {
                label: "Egresos",
                backgroundColor: "rgb(255, 0, 0)",
                borderColor: "rgb(0,0,0)",
                data: [dataEgresos, props.egresosMes, 0],
              },
            ],
          }}
          height={120}
          options={{
            title: {
              display: true,
              text: "Resumen general",
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        ></Bar>
      )}
    </div>
  );
}

export default BarGraphs;
