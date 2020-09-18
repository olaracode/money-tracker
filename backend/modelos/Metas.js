const mongoose = require("mongoose");

const metasSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  nombre: { type: String, required: true },
  monto: { type: Number, required: true },
  descripcion: { type: String },
  pagos: { type: Number, default: 0 },
});

module.exports = Metas = mongoose.model("meta", metasSchema);
