import Tasks from "../models/todoItem.model.js";

export const createTodo = async (req, res) => {
    const { title, description, status, dueDate, priority } = req.body;
    try {
        const taskExists = await Tasks.findOne({ title });
        if (taskExists) {
            return res.status(400).send("Todo with same title already exists");
        }
        await Tasks.create({ title, description, status, dueDate, priority, userId: req.user.userId });
        res.status(201).send("Todo item created successfully");

    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const getTodo = async (req, res) => {
    try {
        const userId = req.user.userId;
        const tasks = await Tasks.find({ userId }, { title: 1, description: 1, status: 1, dueDate: 1, priority: 1 });

        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).send(error.message);
    }
};





export const getTodoByID = async (req, res) => {
    try {
        const { id } = req.params;
        const tasks = await Tasks.find({ _id: id }, { title: 1, description: 1, status: 1, dueDate: 1, priority: 1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, dueDate } = req.body;
        const updateFields = {};
    
        if (status !== null && status !== undefined) {
            updateFields.status = status;
        }
    
        if (dueDate !== null && dueDate !== undefined) {
            updateFields.dueDate = dueDate;
        }
    
        const tasks = await Tasks.updateOne({ _id: id }, { $set: updateFields });
    
        if (!tasks.modifiedCount) {
            return res.status(404).json({ message: "Task not found or no fields updated" });
        }
    
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
    
};


export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Tasks.deleteOne({ _id: id });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};