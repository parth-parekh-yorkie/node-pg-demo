import { ZodError } from "zod";

export const errorHandler = (err, req, res, _next) => {
  // Zod validation error
  if (err instanceof ZodError) {
    return res.status(400).json({
      errors: err.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // PostgreSQL unique constraint
  if (err.code === "23505") {
    return res.status(409).json({
      error: "Resource already exists",
    });
  }

  // Known operational error
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  // Unknown / programmer error
  console.error("🔥 UNHANDLED ERROR:", err);

  return res.status(500).json({
    error: "Internal server error",
  });
};
