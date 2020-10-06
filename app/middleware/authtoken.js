const jwt = require("jsonwebtoken");
module.exports = function(req, res, next) {
  const token = req.headers.headers

  if (!token) return res.status(401).json({ message: "Auth Error" });
  try {
    const decoded = jwt.verify(token, '54h46674b840ajkkjb658jgse95oiih28gjj00g64db10fdd990jg911236af');
    req.user = decoded.user;
   
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};