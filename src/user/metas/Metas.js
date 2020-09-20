import React, { useState, useEffect } from "react";
import "./metas.css";
import axios from "axios";
import MetaContainer from "./MetaContainer";
import AddMeta from "./AddMeta";
import { Grid } from "@material-ui/core";

function Metas() {
  const [metas, setMetas] = useState();
  useEffect(() => {
    let token = localStorage.getItem("auth-token");
    const getMetas = async () => {
      const reqMetas = await axios.get(
        "http://localhost:5000/users/metas",
        { headers: { "auth-token": token } },
        []
      );
      setMetas(reqMetas.data);
      console.log(reqMetas.data);
    };
    getMetas();
  }, []);
  return (
    <div className="metasContainer">
      <div className="fixedButton">
        <AddMeta />
      </div>
      <h3 className="metasH3">Metas</h3>
      <Grid container spacing={4}>
        {metas ? (
          metas.map((meta) => {
            return (
              <Grid item xs={12} sm={6}>
              <MetaContainer
                key={meta._id}
                nombre={meta.nombre}
                monto={meta.monto}
                pago={meta.pagos}
              />
              </Grid>
            );
          })
        ) : (
          <div>No hay metas</div>
        )}
      </Grid>
    </div>
  );
}

export default Metas;
