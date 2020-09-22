import React from "react";
import { Bar } from "react-chartjs-2";

function BarGraphs(props) {
  return (
    <div>
      <Bar
        data={{
          labels: ["Total", "Mensual"],
          datasets: [
            {
              label: "Ingresos",
              backgroundColor: "rgb(0, 224, 34)",
              borderColor: "rgb(0,0,0)",
              data: [props.dataIngresos, props.ingresosMes, 0],
            },
            {
              label: "Egresos",
              backgroundColor: "rgb(255, 0, 0)",
              borderColor: "rgb(0,0,0)",
              data: [props.dataEgresos, props.egresosMes, 0],
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
          maintainAspectRatio: false,
        }}
      ></Bar>
    </div>
  );
}

export default BarGraphs;
