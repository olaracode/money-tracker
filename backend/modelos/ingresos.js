const mongoose = require("mongoose");

const ingresoSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  monto: { type: Number, required: true },
  categoria: { type: String, required: true },
  descripcion: { type: String },
  fecha: {type: Date, required: true}
});

module.exports = Ingreso = mongoose.model("ingreso", ingresoSchema);
