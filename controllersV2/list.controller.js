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

        res.status(201).json({status:200 , message: "List created successfully" , list_id : list._id});
    } catch (error) {
        res.status(500).send(error.message);
    }
};



export const getAllList = async (req, res) => {
    try {
        const userId = req.user.userId;
        const lists = await List.find({ userId }, { name: 1, _id: 0 });
        res.status(200).json({status:200 , message : "all list" ,  lists:lists});
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
        res.status(200).json({status:200 , message : "list for given id"  ,   list:list});
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updateListByID = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, itemid, status } = req.body;

        
        await Tasks.findByIdAndUpdate(itemid, { status: status });

        await List.findByIdAndUpdate(id, { name: name });
        
        await List.findOneAndUpdate(
            { _id: id, "todoItem._id": itemid },
            { $set: { "todoItem.$.status": status } },
        );

        res.status(200).json({ status : 200 , message: "List and item updated successfully" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};





export const deleteListByID = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await List.deleteOne({ _id: id });
        res.status(200).json({status:200 , message : "item deleted" , result:result });
    } catch (error) {
        res.status(500).send(error.message);
    }
};








