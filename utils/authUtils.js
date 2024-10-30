import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({
      message: "A token is required for authentication",
    });
  }

  try {
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if(err){
        return res.status(401).send({
          message:"Unauthorized!"
        })
      }

      req.userId = decoded.id
      next()
    })
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
