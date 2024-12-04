import mongoose from "mongoose";

const todoItemSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            unique: true,
            required: [true, "title is required"],
        },
        description: {
            type: String,
            required: [true, "description is required"],
        },
        dueDate: {
            type: Date,
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
        },
        status: {
            type: String,
            enum: ["pending", "in-progress", "completed"],
            default: "pending",
        },

    },
    {
        timestamps: true,
    }
);

const Tasks = mongoose.model("TodoItem", todoItemSchema);

export default Tasks;
