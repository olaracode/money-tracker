const User = require("../modelos/usuarios");
const Metas = require("../modelos/metas");

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
