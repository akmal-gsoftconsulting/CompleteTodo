import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./configure/db.js";
import authRoutes from "./routes/auth.route.js";
import todoItemRoutes from "./routes/todoItem.route.js";
import userManageRoutes from "./routes/userManage.route.js";
import listRoutes from "./routes/list.route.js";
import collaboratorRoutes from "./routes/collaborator.route.js";
import notificationRoutes from "./routes/notification.route.js";
import reminderRoutes from "./routes/reminder.route.js";
import filterRoutes from "./routes/filter.route.js";
import tagRoutes from "./routes/tag.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todoItem", todoItemRoutes);
app.use("/api/userManage", userManageRoutes);
app.use("/api/list", listRoutes);
app.use("/api/collaborator", collaboratorRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/reminder", reminderRoutes);
app.use("/api/filter" , filterRoutes);
app.use("/api/tag" , tagRoutes);
app.use("/api/analytics" , analyticsRoutes);

app.use("/", async (req, res) => {
	res.send("initial route");
});
app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
	connectDB();
});