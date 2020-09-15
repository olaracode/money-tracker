const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  sexo: { type: String, required: true },
  saldo: { type: Number, default: 0 },
  ingresosMes: { type: Number, default: 0 },
  egresosMes: { type: Number, default: 0 },
});

module.exports = User = mongoose.model("user", userSchema);
