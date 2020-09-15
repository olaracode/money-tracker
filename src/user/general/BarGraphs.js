import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

function BarGraphs(props) {
  return (
    <div>
      {props.isLoading ? (
        <CircularProgress />
      ) : (
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
          }}
        ></Bar>
      )}
    </div>
  );
}

export default BarGraphs;
