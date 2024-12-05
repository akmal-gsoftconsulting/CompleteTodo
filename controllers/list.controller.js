import List from "../models/list.model.js";
import Tasks from "../models/todoItem.model.js";

export const createList = async (req, res) => {
    try {

        const { titleArray, name } = req.body;
        const userId = req.user.userId;
        var tasks = await Tasks.find({ userId });
        tasks = tasks.filter(task => titleArray.includes(task.title));
        const todoTaskIds = tasks.map(task => task._id);

        const list = new List({
            name,
            userId,
            todoTaskIds
        });

        await list.save();

        res.status(201).json({ message: "List created successfully" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};



export const getAllList = async (req, res) => {
    try {
        const userId = req.user.userId;
        const lists = await List.find({ userId }, { name: 1, _id: 0 });
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getListByID = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;
        var list = await List.findById(id);

        if (!list) {
            return res.status(404).json({ message: "List not found" });
        }

        var tasks = await Tasks.find({ _id: { $in: list.todoTaskIds } }, { title: 1, description: 1, status: 1, dueDate: 1, priority: 1 });

        var result = {
            "name": list.name,
            "tasks": tasks,
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};




export const updateListByID = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, itemid , status } = req.body;
        var list = await List.findById(id);
        var tasks = await Tasks.find({ _id: { $in: list.todoTaskIds } });

        tasks = tasks.filter(task => task._id == itemid);
        
        
        if (!list) {
            return res.status(404).json({ message: "List not found" });
        }
        
        list.name = name;
        tasks[0].status = status;
        await list.save();
        await tasks[0].save();

        res.status(200).json({ message: "List updated successfully" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};



export const deleteListByID = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await List.deleteOne({ _id: id });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};








