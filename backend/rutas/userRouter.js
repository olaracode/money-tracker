const router = require("express").Router();
const { auth } = require("../middleware/auth");
const {
  getAll,
  registroUsuario,
  login,
  eliminarUsuario,
  updateUsuario,
  verifyToken,
  getUser,
} = require("./user");
const {
  ingresosUsuario,
  nuevoIngreso,
  corregirIngreso,
  eliminarIngreso,
  ultimoIngreso,
  eachIngresoMes,
  ingresosMensual,
  ingresosCategorias,
  categoriasMensualesIngresos,
} = require("./ingresos");
const {
  egresosUsuario,
  nuevoEgreso,
  corregirEgreso,
  eliminarEgreso,
  ultimoegresosUsuario,
  eachEgresoMes,
} = require("./egresos");

// USUARIOS

//Get all users
router.get("/all", getAll);

//Get one user
router.get("/", auth, getUser);

// register users
router.post("/registro", registroUsuario);

// Eliminar usuario
router.delete("/delete", auth, eliminarUsuario);

// Login
router.post("/login", login);

//Validar token
router.post("/tokenIsValid", verifyToken);

// Update user
router.post("/update", auth, updateUsuario);

// INGRESOS

// Todos los ingresos de un usuario
router.get("/ingresos", auth, ingresosUsuario);
router.get("/ingreso/ultimo", auth, ultimoIngreso);

// Nuevo ingreso
router.post("/ingreso/add", auth, nuevoIngreso);

//corregir ingreso
router.post("/ingreso/corregir/:id", auth, corregirIngreso);

router.delete("/ingreso/eliminar/:id", auth, eliminarIngreso);

router.get("/ingresosMes", auth, eachIngresoMes); //Suma de todos los ingresos de un mes
router.get("/ingresos/mensuales", auth, ingresosMensual); //Todos los ingresos divididos entre los doce meses
router.get("/ingresos/categoria", auth, ingresosCategorias); // Ingresos totales divididos en categorias
router.get("/ingresos/mes/categoria", auth, categoriasMensualesIngresos); // Ingresos del MES ACTUAL dividido en categorias

// EGRESO
router.get("/egresosMes", auth, eachEgresoMes);

// Todos los egresos de un usuario
router.get("/egresos", auth, egresosUsuario);
router.get("/egresos/ultimo", auth, ultimoegresosUsuario);

// Añadir Egreso
router.post("/egreso/add", auth, nuevoEgreso);

// Corregir egreso
router.post("/egreso/corregir/:id", auth, corregirEgreso);

// Eliminar egreso
router.delete("/egreso/eliminar/:id", auth, eliminarEgreso);

module.exports = router;
