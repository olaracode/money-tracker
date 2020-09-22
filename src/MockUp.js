import React from "react";
import mockup from "./images/x.png";
import playStore from "./images/App-Store-Google-Play-Badges-Vector.jpg";

function MockUp() {
  return (
    <div>
      <div className="mockupContainer">
        <div className="mockupTexto">
          <h1>Trabajamos para su comodidad</h1>
          <p>
            Proximamente nuestra app va a estar disponible para su dispositivo
            movil
          </p>
          <img alt="" className="playStore" src={playStore} />
        </div>
        <img className="muckupImg" alt="" src={mockup} />
      </div>
    </div>
  );
}

export default MockUp;
