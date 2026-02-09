// src/app.js
import express from "express";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/posts.routes.js";
import healthRoutes from "./routes/health.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/health", healthRoutes);

// must be last middleware
app.use(errorHandler);

export default app;
