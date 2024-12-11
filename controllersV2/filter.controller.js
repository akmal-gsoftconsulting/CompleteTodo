import Tasks from "../models/todoItem.model.js";



export const filterTodoItems = async (req , res) => {
    try {
        const { status, priority, dueDate, tag, title } = req.query;
        const userId = req.user.userId;
        if (!status && !priority && !dueDate && !tag && !title) {
            return res.status(400).send("No filter selected");
        }
        const filter = { userId };
        if (status) filter.status = status;
        if (priority) filter.priority = priority;
        if (dueDate) filter.dueDate = dueDate;
        if (tag) filter.tag = tag;
        if (title) filter.title = { $regex: title, $options: "i" }; 
        const tasks = await Tasks.find(filter, {
            title: 1, description: 1, status: 1, dueDate: 1, priority: 1,
        });
        return res.status(200).json({status : 200 , message : "Todo items with given filters" , tasks: tasks  });
    } catch (error) {
        res.status(500).send(error.message);
    }
}



