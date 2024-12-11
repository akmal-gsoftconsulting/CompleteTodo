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


import authRoutesV2 from "./routesV2/auth.route.js";
import todoItemRoutesV2 from "./routesV2/todoItem.route.js";
import userManageRoutesV2 from "./routesV2/userManage.route.js";
import listRoutesV2 from "./routesV2/list.route.js";
import collaboratorRoutesV2 from "./routesV2/collaborator.route.js";
import notificationRoutesV2 from "./routesV2/notification.route.js";
import reminderRoutesV2 from "./routesV2/reminder.route.js";
import filterRoutesV2 from "./routesV2/filter.route.js";
import tagRoutesV2 from "./routesV2/tag.route.js";
import analyticsRoutesV2 from "./routesV2/analytics.route.js";

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


app.use("/api/v2/auth", authRoutesV2);
app.use("/api/v2/todoItems", todoItemRoutesV2);
app.use("/api/v2/user", userManageRoutesV2);
app.use("/api/v2/list", listRoutesV2);
app.use("/api/v2/collaborator", collaboratorRoutesV2);
app.use("/api/v2/notifications", notificationRoutesV2);
app.use("/api/v2/reminders", reminderRoutesV2);
app.use("/api/v2/filter" , filterRoutesV2);
app.use("/api/v2/tags" , tagRoutesV2);
app.use("/api/v2/analytics" , analyticsRoutesV2);


app.use("/", async (req, res) => {
	res.send("initial route");
});

app.listen(PORT, () => {
	connectDB();
	console.log("Server is running on http://localhost:" + PORT);
});