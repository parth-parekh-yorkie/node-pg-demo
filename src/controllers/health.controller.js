import { query } from "../config/db.js";

export const healthCheck = async (req, res) => {
  try {
    // lightweight DB ping
    await query("SELECT 1");

    res.status(200).json({
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Database unavailable",
    });
  }
};
