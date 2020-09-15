const Ingreso = require("../modelos/ingresos");
const User = require("../modelos/usuarios");

exports.ingresosUsuario = async (req, res) => {
  const ingresos = await Ingreso.find({ userid: req.user }).sort("fecha");
  return res.status(200).json(ingresos);
};
exports.ultimoIngreso = async (req, res) => {
  try {
    const ingresos = await Ingreso.find({ userid: req.user }).sort(
      "created_at"
    );
    if (ingresos.length - 1 === 0) {
      const ultimoIngreso = ingresos[0];
      const fecha = {
        dia: ultimoIngreso.fecha.getDate(),
        mes: ultimoIngreso.fecha.getMonth(),
        ano: ultimoIngreso.fecha.getFullYear(),
      };
      const ingreso = {
        monto: ultimoIngreso.monto,
        fecha: fecha,
      };
      return res.status(200).json(ingreso);
    }
    const ultimoIngreso = ingresos[ingresos.length - 1];
    const fecha = {
      dia: ultimoIngreso.fecha.getDate(),
      mes: ultimoIngreso.fecha.getMonth(),
      ano: ultimoIngreso.fecha.getFullYear(),
    };
    const ingreso = {
      monto: ultimoIngreso.monto,
      fecha: fecha,
    };
    return res.status(200).json(ingreso);
  } catch (err) {
    return res.status(500).json(`internal server error ${err}`);
  }
};

exports.nuevoIngreso = async (req, res) => {
  let { monto, categoria, descripcion } = req.body;
  if (!monto || !categoria) {
    return res.status(400).json({ err: "Required fields missing" });
  }
  const fecha = new Date();
  const userid = req.user;
  const ingreso = new Ingreso({
    monto,
    categoria,
    fecha,
    userid,
    descripcion,
  });
  const user = await User.findOne({ _id: userid });
  user.saldo += ingreso.monto;
  user.ingresosMes += ingreso.monto;
  ingreso.save();
  user.save();
  return res.status(200).json({ msg: "Ingreso agregado con exito" });
};

exports.corregirIngreso = async (req, res) => {
  let { monto, categoria, descripcion } = req.body;
  const ingresoCorregir = await Ingreso.findOne({ _id: req.params.id });
  const usuario = await User.findOne({ _id: req.user });
  if (!ingresoCorregir) {
    return res.status(400).json({ err: "El ingreso a corregir no existe" });
  }
  if (monto) {
    usuario.saldo -= ingresoCorregir.monto;
    usuario.ingresosMes -= ingresoCorregir.monto;
    ingresoCorregir.monto = monto;
    usuario.saldo += monto;
    usuario.ingresosMes += monto;
  }
  if (categoria) {
    ingresoCorregir.categoria = categoria;
  }
  if (descripcion) {
    ingresoCorregir.descripcion = descripcion;
  }
  ingresoCorregir.fecha = new Date();
  ingresoCorregir.save();
  usuario.save();
  return res.status(200).json({ msg: "Ingreso corregido con exito" });
};

exports.eliminarIngreso = async (req, res) => {
  try {
    const ingreso = await Ingreso.findOne({ _id: req.params.id });
    console.log(ingreso);
    if (!ingreso) {
      return res.status(400).json("Ingreso no existe");
    }
    const user = await User.findOne({ _id: req.user });
    user.ingresosMes -= ingreso.monto;
    user.saldo -= ingreso.monto;
    const borrado = await Ingreso.findOneAndDelete({ _id: req.params.id });
    user.save();
    return res
      .status(200)
      .json({ msg: "Ingreso eliminado de manera correcta" });
  } catch (err) {
    return res.status(500).json({ error: err.msg });
  }
};

exports.eachIngresoMes = async (req, res) => {
  try {
    const mes = new Date();
    const ingresos = await Ingreso.find({ userid: req.user });
    const getAllincomes = ingresos.map((ingreso) => {
      if (ingreso.fecha.getMonth() === mes.getMonth()) {
        return ingreso;
      }
    });
    const ingresosEsteMes = getAllincomes;
    return res.status(200).json(ingresosEsteMes);
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};
