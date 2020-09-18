const User = require("../modelos/usuarios");
const Metas = require("../modelos/Metas");
const Egreso = require("../modelos/egresos");

exports.metasUsuario = async (req, res) => {
  try {
    const metas = await Metas.find({ userid: req.user });
    return res.status(200).json(metas);
  } catch (err) {
    return res.status(500).json({ err: "No hay metas agregadas" });
  }
};

exports.nuevaMeta = async (req, res) => {
  try {
    let { nombre, monto, descripcion } = req.body;
    if (!monto || !nombre) {
      return res.status(400).json({ err: "All fields required" });
    }
    const userid = req.user;
    const meta = new Metas({
      nombre,
      monto,
      descripcion,
      userid,
    });
    const metaGuardada = meta.save();
    return res.status(200).json({ msg: "Meta guardada con exito" });
  } catch (err) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

exports.nuevoPago = async (req, res) => {
  try {
    // if (meta.pagos === meta.monto) {
    //   return res.status(400).json({ msg: "Esta meta ya fue alcanzada" });
    // }
    let { monto } = req.body;
    const metaId = req.headers.id;
    const meta = await Metas.findOne({ _id: metaId });
    const user = await User.findOne({ _id: req.user });
    const egresoMeta = new Egreso({
      monto,
      userid: metaId,
      categoria: "Metas",
      descripcion: meta.nombre,
      fecha: new Date(),
    });
    meta.pago += monto;
    if (meta.pago > meta.monto) {
      return res
        .status(400)
        .json({ msg: "El monto ingresado supera el limite de la meta" });
    }
    egresoMeta.save();
    user.saldo -= monto;
    meta.save();
    user.save();
    return res.status(200).json({ msg: "Pago procesado correctamente" });
  } catch (msg) {
    return res.status(500).json({ msg });
  }
};
