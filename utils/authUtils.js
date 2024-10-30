import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({
      message: "Um token é necessário para a autenticação",
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Não autorizado!",
        });
      }

      req.userId = decoded.userId;

      next();
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
