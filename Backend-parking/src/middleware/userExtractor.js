import jwt from "jsonwebtoken";

export const userExtractor = (req, res, next) => {
  try {
    let token = req.headers['authorization'];
    console.log(req.headers['authorization'])
    token = token.substring(7)

    if (!token) {
      console.log("sin token");
      return res
        .status(403)
        .json({ message: "No token, authorization denied" });
    }

    jwt.verify(token, "secretito", (error, user) => {
      if (error) {
        console.log("token no válido");
        return res.status(402).json({ message: "Token is not valid" });
      }
      req.user = user;
      console.log(user)
      next();
    });
  } catch (error) {
    console.log(error)
    return res.status(600).json({ message: error.message });
  }
};

export default userExtractor;
