const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      return res.status(401).json({ err: "No authentication token" });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(!verified){
        return res.status(401).json({msg: "Token verification failed"})
    }
    req.user = verified.id;
    next();
  } catch(err){
      return res.status(500).json({error: err.code})
  }
};