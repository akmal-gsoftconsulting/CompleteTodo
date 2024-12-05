import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./configure/db.js";
import authRoutes from "./routes/auth.route.js";
import todoItemRoutes from "./routes/todoItem.route.js";
import userManageRoutes from "./routes/userManage.route.js";
import listRoutes from "./routes/list.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todoItem", todoItemRoutes);
app.use("/api/userManage", userManageRoutes);
app.use("/api/list", listRoutes);

app.use("/", async (req, res) => {
	res.send("initial route");
});
app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
	connectDB();
});