import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { Line, Pie } from "react-chartjs-2";
import "./ingresos.css";

function Graficos(props) {
  const lineData = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: props.lineaTexto,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [
          props.linea.enero,
          props.linea.febrero,
          props.linea.marzo,
          props.linea.abril,
          props.linea.mayo,
          props.linea.junio,
          props.linea.julio,
          props.linea.agosto,
          props.linea.octubre,
          props.linea.noviembre,
          props.linea.diciembre,
        ],
      },
    ],
  };
  return (
    <div className="graficosContainer">
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Pie
              data={{
                labels: props.categorias,
                datasets: [
                  {
                    data: [
                      props.salario.mes,
                      props.bienesRaices.mes,
                      props.ventas.mes,
                      props.miscelaneos.mes,
                    ],
                    backgroundColor: props.backgroundColor,
                  },
                ],
              }}
              options={{
                title: {
                  display: true,
                  text: props.texto.mes,
                },
                legend: {
                  display: true,
                  position: "left",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Pie
              data={{
                labels: props.categorias,
                datasets: [
                  {
                    data: [
                      props.salario.totales,
                      props.bienesRaices.totales,
                      props.ventas.totales,
                      props.miscelaneos.totales,
                    ],
                    backgroundColor: props.backgroundColor,
                  },
                ],
              }}
              options={{
                title: {
                  display: true,
                  text: props.texto.totales,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </Grid>
          <div className="lineHeight">
            <Grid item xs={12} sm={12}>
              <Line data={lineData} />
            </Grid>
          </div>
        </Grid>
      </Paper>
    </div>
  );
}

export default Graficos;
