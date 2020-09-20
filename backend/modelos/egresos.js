const mongoose = require("mongoose");

const egresoSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  monto: { type: Number, required: true },
  categoria: { type: String, required: true },
  descripcion: { type: String },
  fecha: { type: Date, required: true },
  metaid: { type: String },
});

module.exports = Egreso = mongoose.model("egreso", egresoSchema);
