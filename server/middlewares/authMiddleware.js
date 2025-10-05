import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    console.log("Authorization Header:", header); // ← Add this

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = header.split(" ")[1];
    console.log("Token received:", token); // ← Add this

    // JWT verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded); // ← Add this

    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};
