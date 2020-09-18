const User = require("../modelos/usuarios");
const Egreso = require("../modelos/egresos");
const Metas = require("../modelos/Metas");

//Retorna todos los egresos asociados a un usuario
exports.egresosUsuario = async (req, res) => {
  // Se utiliza el id del request(req.user) para encontrar todos los egresos asociados a ese usuario
  const egresos = await Egreso.find({ userid: req.user });
  return res.status(200).json(egresos);
};

exports.ultimoegresosUsuario = async (req, res) => {
  // Se utiliza el id del request(req.user) para encontrar todos los egresos asociados a ese usuario
  try {
    const egresos = await Egreso.find({ userid: req.user }).sort("created_at");
    if (egresos.length - 1 === 0) {
      const ultimoegreso = egresos[0];
      const fecha = {
        dia: ultimoegreso.fecha.getDate(),
        mes: ultimoegreso.fecha.getMonth(),
        ano: ultimoegreso.fecha.getFullYear(),
      };
      const egreso = {
        monto: ultimoegreso.monto,
        fecha: fecha,
      };
      return res.status(200).json(egreso);
    }
    const ultimoEgreso = egresos[egresos.length - 1];
    const fecha = {
      dia: ultimoEgreso.fecha.getDate(),
      mes: ultimoEgreso.fecha.getMonth(),
      ano: ultimoEgreso.fecha.getFullYear(),
    };
    const egreso = {
      monto: ultimoEgreso.monto,
      fecha: fecha,
    };
    return res.status(200).json(egreso);
  } catch (err) {
    return res.status(500).json("No hay egreso");
  }
};

// Crea un nuevo ingreso
exports.nuevoEgreso = async (req, res) => {
  let { monto, categoria, descripcion } = req.body; // Se asignan valores del request
  if (!monto || !categoria) {
    // Se verifica que los campos requeridos no esten vacios
    return res.status(400).json({ err: "Required fields missing" });
  }
  const fecha = new Date(); // Se asigna la fecha actual a la variable "fecha"
  const userid = req.user; // utilizando el usuario del req se le asigna valor a la variable userid.
  const egreso = new Egreso({
    // se define el objeto a guardar
    monto,
    categoria,
    fecha,
    userid,
    descripcion,
  });

  // Se guarda el usuario dentro de una variable para poder acceder al saldo y a los egresos del mes
  const user = await User.findOne({ _id: userid });
  user.saldo -= egreso.monto; // Se resta el monto del egreso al saldo del usuario
  user.egresosMes += egreso.monto; // Se asigna un valor negativo a egresosMes
  egreso.save(); // Se guarda en la base de datos el egreso nuevo
  user.save(); // Se guarda la version actualizada del usuario
  return res.status(200).json({ msg: "Egreso agregado con exito" });
};

// Corregir un engreso
exports.corregirEgreso = async (req, res) => {
  let { monto, categoria, descripcion } = req.body;
  const egresoCorregir = await Egreso.findOne({ _id: req.params.id });
  const usuario = await User.findOne({ _id: req.user });
  if (!egresoCorregir) {
    return res.status(400).json({ err: "El egreso a corregir no existe" });
  }
  if (monto) {
    usuario.saldo += egresoCorregir.monto;
    usuario.egresosMes += egresoCorregir.monto;
    egresoCorregir.monto = monto;
    usuario.saldo -= monto;
    usuario.egresosMes -= monto;
  }
  if (categoria) {
    egresoCorregir.categoria = categoria;
  }
  if (descripcion) {
    egresoCorregir.descripcion = descripcion;
  }
  egresoCorregir.fecha = new Date();
  egresoCorregir.save();
  usuario.save();
  return res.status(200).json({ msg: "Egreso corregido con exito" });
};

exports.eliminarEgreso = async (req, res) => {
  try {
    const egreso = await Egreso.findOne({ _id: req.params.id });
    console.log(egreso);
    if (!egreso) {
      return res.status(400).json("Egreso no existe");
    }
    const user = await User.findOne({ _id: req.user });
    user.egresosMes += egreso.monto;
    user.saldo += egreso.monto;
    const borrado = await Egreso.findOneAndDelete({ _id: req.params.id });
    user.save();
    return res.status(200).json({ msg: "Egreso eliminado de manera correcta" });
  } catch (err) {
    return res.status(500).json({ error: err.msg });
  }
};
exports.eachEgresoMes = async (req, res) => {
  try {
    const mes = new Date();
    const egresos = await Egreso.find({ userid: req.user });
    const getAlloutcomes = egresos.map((egreso) => {
      if (egreso.fecha.getMonth() === mes.getMonth()) {
        return egreso;
      }
    });
    const egresosEsteMes = getAlloutcomes;
    return res.status(200).json(egresosEsteMes);
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};

exports.egresosMensual = async (req, res) => {
  try {
    const egresos = await Egreso.find({ userid: req.user });
    const egresosMensuales = {
      enero: 0,
      febrero: 0,
      marzo: 0,
      abril: 0,
      mayo: 0,
      junio: 0,
      julio: 0,
      agosto: 0,
      septiembre: 0,
      octubre: 0,
      noviembre: 0,
      diciembre: 0,
    };
    const meses = egresos.map((egreso) => {
      switch (egreso.fecha.getMonth()) {
        case 1:
          egresosMensuales.enero += egreso.monto;
          break;
        case 2:
          egresosMensuales.febrero += egreso.monto;
          break;
        case 3:
          egresosMensuales.marzo += egreso.monto;
          break;
        case 4:
          egresosMensuales.abril += egreso.monto;
          break;
        case 5:
          egresosMensuales.mayo += egreso.monto;
          break;
        case 6:
          egresosMensuales.junio += egreso.monto;
          break;
        case 7:
          egresosMensuales.julio += egreso.monto;
          break;
        case 8:
          egresosMensuales.agosto += egreso.monto;
          break;
        case 9:
          egresosMensuales.septiembre += egreso.monto;
          break;
        case 10:
          egresosMensuales.octubre += egreso.monto;
          break;
        case 11:
          egresosMensuales.noviembre += egreso.monto;
          break;
        case 12:
          egresosMensuales.diciembre += egreso.monto;
          break;
        default:
          break;
      }
    });
    return res.status(200).json(egresosMensuales);
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

exports.categoriasMensualesEgresos = async (req, res) => {
  try {
    const egresos = await Egreso.find({ userid: req.user });
    const mesActual = new Date().getMonth();
    const categorias = {
      renta: 0,
      servicios: 0,
      comida: 0,
      lujos: 0,
      metas: 0,
      salidas: 0,
      miscelaneos: 0,
    };
    const esteMes = egresos.map((egreso) => {
      if (egreso.fecha.getMonth() === mesActual) {
        switch (egreso.categoria) {
          case "Renta":
            categorias.renta += egreso.monto;
            break;
          case "Servicios":
            categorias.servicios += egreso.monto;
            break;
          case "Comida":
            categorias.comida += egreso.monto;
            break;
          case "Lujos":
            categorias.lujos += egreso.monto;
            break;
          case "Metas":
            categorias.metas += egreso.monto;
            break;
          case "Salidas":
            categorias.salidas += egreso.monto;
            break;
          case "Miscelaneos":
            categorias.miscelaneos += egreso.monto;
            break;
          default:
            categorias.miscelaneos += egreso.monto;
            break;
        }
      }
    });
    return res.status(200).json(categorias);
  } catch (err) {
    return res.status(500).json({ err: "Internal server error" });
  }
};
exports.egresosCategorias = async (req, res) => {
  try {
    const egresos = await Egreso.find({ userid: req.user });
    const categorias = {
      renta: 0,
      servicios: 0,
      comida: 0,
      lujos: 0,
      metas: 0,
      salidas: 0,
      miscelaneos: 0,
    };
    const categoriaEgresos = egresos.map((egreso) => {
      switch (egreso.categoria) {
        case "Renta":
          categorias.renta += egreso.monto;
          break;
        case "Servicios":
          categorias.servicios += egreso.monto;
          break;
        case "Comida":
          categorias.comida += egreso.monto;
          break;
        case "Lujos":
          categorias.lujos += egreso.monto;
          break;
        case "metas":
          categorias.metas += egreso.monto;
          break;
        case "salidas":
          categorias.salidas += egreso.monto;
          break;
        case "miscelaneos":
          categorias.miscelaneos += egreso.monto;
          break;
        default:
          categorias.miscelaneos += egreso.monto;
          break;
      }
    });
    return res.status(200).json(categorias);
  } catch (err) {
    return res.status(500).json("Internal Server Error");
  }
};
