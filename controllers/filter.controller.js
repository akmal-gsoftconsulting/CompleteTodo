import Tasks from "../models/todoItem.model.js";



export const filterbyProperty = async (req, res) => {

    try {
        const { status , priority , dueDate , tag } = req.body;
        const userId = req.user.userId;

        if(!status && !priority && !dueDate && !tag){
            return res.status(400).send("No filter selected");
        }

        if(status){
            const tasks = await Tasks.find({  userId, status }, { title: 1, description: 1, status: 1, dueDate: 1, priority: 1 });
            return res.status(200).json(tasks);
        }

        if(priority){
            const tasks = await Tasks.find({  userId, priority }, { title: 1, description: 1, status: 1, dueDate: 1, priority: 1 });
            return res.status(200).json(tasks);
        }

        if(dueDate){
            const tasks = await Tasks.find({  userId, dueDate }, { title: 1, description: 1, status: 1, dueDate: 1, priority: 1 });
            return res.status(200).json(tasks);
        }

        if(tag){
            const tasks = await Tasks.find({  userId, tag }, { title: 1, description: 1, status: 1, dueDate: 1, priority: 1 });
            return res.status(200).json(tasks);
        }
        
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const filterByKey = async (req, res) => {

    try {
        const { key } = req.body;
        const userId = req.user.userId;
        
        const tasks = await Tasks.find({  userId, title: { $regex: key, $options: "i" } }, { title: 1, description: 1, status: 1, dueDate: 1, priority: 1 });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).send("Something went wrong " + error.message);
    }
}