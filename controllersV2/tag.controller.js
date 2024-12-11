import Tag  from "../models/tag.model.js";
import Tasks from "../models/todoItem.model.js";

export const createTag = async (req, res) => {
    try {
        const { name , titleArray } = req.body;
        const userId = req.user.userId;
        const todoItem = await Tasks.find( {title : { $in : titleArray }}  )
        const tag = new Tag({ userId, name, todoItem });
        
        const result = await tag.save();
        res.status(200).json("Tag created successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const getTags = async (req, res) => {
    try {
        const userId = req.user.userId;
        const tags = await Tag.find({ userId } , { name: 1, _id: 0 });
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const result = await Tag.updateOne({ _id: id }, { name });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


export const deleteTag = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Tag.deleteOne({ _id: id });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}