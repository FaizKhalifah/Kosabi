import jwt from "jsonwebtoken";
import config from "../config/index.js";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header is required",
      });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }

    const decoded = jwt.verify(token, config.APP_SECRET);

    req.user = {
      id: decoded.sub,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ msg: "Access denied" });
  }
  next();
};

const isTenant = (req, res, next) => {
  if (req.user.role !== "TENANT") {
    return res.status(403).json({ msg: "Access denied" });
  }
  next();
};

export default { authMiddleware, isAdmin, isTenant };
