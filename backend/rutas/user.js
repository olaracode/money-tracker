const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../modelos/usuarios");
const Egreso = require("../modelos/egresos");
const Ingreso = require("../modelos/ingresos");

exports.getAll = async (req, res) => {
  const usuarios = await User.find();
  res.json(usuarios);
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    username: user.username,
    id: user._id,
    ingresosMes: user.ingresosMes,
    egresosMes: user.egresosMes,
    saldo: user.saldo
  });
};

exports.registroUsuario = async (req, res) => {
  try {
    let { username, email, password, passwordCheck, sexo } = req.body;

    if (!username || !email || !password || !passwordCheck || !sexo) {
      return res.status(400).json({ msg: "All fields required" });
    }
    if (username.length < 5 || email.length < 5) {
      return res
        .status(400)
        .json({ msg: "Field must be over 5 characters long" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: "Password must be over 8 characters long" });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ msg: "This email is already in use" });
    }
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      return res.status(400).json({ msg: "This username is already taken" });
    }

    if (password !== passwordCheck) {
      return res.status(400).json({ msg: "Passwords must match" });
    }

    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      sexo,
      password: hashPass,
    });

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch {
    res.status(500).json({ msg: "Internal error" });
  }
};

exports.eliminarUsuario = async (req, res) => {
  const ingresosUsuario = await Ingreso.find({ userid: req.user });
  const egresosUsuario = await Egreso.find({ userid: req.user });
  if (ingresosUsuario.length > 0) {
    ingresosUsuario.map((ingreso) => {
      const ingresoBorrado = Ingreso.findOneAndDelete({ _id: ingreso._id });
    });
  }
  if (egresosUsuario.length > 0) {
    egresosUsuario.map((egreso) => {
      const ingresoBorrado = Egreso.findOneAndDelete({ _id: egreso._id });
    });
  }
  const usuarioBorrado = await User.findOneAndDelete({ _id: req.user });
  return res.status(200).json({ msg: "Usuario eliminado con exito" });
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "User not registered" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal Error" });
  }
};

exports.updateUsuario = async (req, res) => {
  let { username, email } = req.body;
  const userdata = await User.findOne({ _id: req.user });

  if (username) {
    userdata.username = username;
  }
  if (email) {
    userdata.email = email;
  }
  userdata.save();
  return res.status(200).json({ msg: "User updated successfully" });
};

exports.verifyToken = async (req, res) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
