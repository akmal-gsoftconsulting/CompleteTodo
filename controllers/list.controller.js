import List from "../models/list.model.js";
import Tasks from "../models/todoItem.model.js";
import mongoose from "mongoose";

export const createList = async (req, res) => {
    try {

        const { titleArray, name } = req.body;
        const userId = req.user.userId;
        var tasks = await Tasks.find({ userId });




        if (!tasks) {
            return res.status(404).json({ message: "Tasks not found" });
        }

        tasks = tasks.filter(task => titleArray.includes(task.title));

        const list = new List({
            name,
            userId,
            todoItem: tasks
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
        const { id } = req.params;
        var list = await List.findById(id);
        if (!list) {
            return res.status(404).json({ message: "List not found" });
        }
        res.status(200).json(list);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updateListByID = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, itemid, status } = req.body;


        // var list = await List.findById(id);

        // if (!list) {
        //     return res.status(404).json({ message: "List not found" });
        // }

        // var index = 0;

        // list.todoTask = list.todoTask.map((task) => {
        //     if (task._id == itemid) {
        //         task.status = status;
        //         index = list.todoTask.indexOf(task);
        //     }
        //     return task;
        // });

        
        await Tasks.findByIdAndUpdate(itemid, { status: status });

        // await List.findByIdAndUpdate(id, { name: name });
        
        // await List.findOneAndUpdate(
        //     { _id: id, "todoItem._id": itemid },
        //     { $set: { "todoItem.$.status": status } },
        // );


        await List.updateOne(
            { _id: id, "todoItem._id": itemid },
            {
                $set: {
                    name: name,
                    "todoItem.$.status": status
                }
            }
        );





        res.status(200).json({ message: "List and item updated successfully" });
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








