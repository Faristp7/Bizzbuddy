import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization;
    const secrectKey = process.env.SECRECTKEY;
    let decoded;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token not provided" });
    }
    jwt.verify(token.replace("Bearer ", ""), secrectKey, (err, result) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
      decoded = result;
    });

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
  }
}

export default verifyToken;
