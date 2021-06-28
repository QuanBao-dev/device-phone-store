const { verify } = require("jsonwebtoken");
const verifyRole = (...roles) => {
  return (req, res, next) => {
    let token = req.signedCookies.idUser;
    if (!token || token === "undefined")
      return res.status(401).send({ error: "Access Denied" });
    try {
      const userVm = verify(token, process.env.JWT_KEY);
      if (!roles.includes(userVm.role))
        return res.status(401).send({ error: "You do not have permission" });
      req.userVm = userVm;
      next();
    } catch (error) {
      res.status(400).send({ error: "Invalid Token" });
    }
  };
};

const verifyLogin = (req, res, next) => {
  const token = req.signedCookies.idUser;
  try {
    verify(token, process.env.JWT_KEY);
    res.status(401).send({ error: "You've already logged in" });
  } catch (error) {
    next();
  }
};

module.exports = { verifyRole, verifyLogin };
