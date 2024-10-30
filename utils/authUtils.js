import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({
      message: "A token is required for authentication",
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }

      req.userId = decoded.userId;

      console.log("Decoded token:", decoded); // Adicione esta linha para verificar o que está no token
      console.log(req.userId)
      next();
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
