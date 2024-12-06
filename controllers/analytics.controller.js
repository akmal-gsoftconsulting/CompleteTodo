import Tasks from "../models/todoItem.model.js";


export const getTodoStats = async (req, res) => {
    try {
        const userId = req.user.userId;
        const tasks = await Tasks.find({ userId });

        const completedTasks = tasks.filter((task) => task.status === "completed");
        const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
        const pendingTasks = tasks.filter((task) => task.status === "pending");
        const overdueTasks = tasks.filter((task) => task.dueDate < new Date() && task.status !== "completed");

        const stats = [];
        stats.push({
            name: "Completed Tasks",
            count: completedTasks.length,
        });
        stats.push({
            name: "In Progress Tasks",
            count: inProgressTasks.length,
        });
        stats.push({
            name: "Pending Tasks",
            count: pendingTasks.length,
        });
        stats.push({
            name: "Overdue Tasks",
            count: overdueTasks.length,
        });


        // const statsByAggregate = await Tasks.aggregate([
        //     {
        //         $match: { userId: userId }  
        //     },
        //     {
        //         $group: {
        //             _id: null,  
        //             completedTasks: {
        //                 $sum: {
        //                     $cond: [{ $eq: ["$status", "completed"] }, 1, 0]
        //                 }
        //             },
        //             inProgressTasks: {
        //                 $sum: {
        //                     $cond: [{ $eq: ["$status", "in-progress"] }, 1, 0]
        //                 }
        //             },
        //             pendingTasks: {
        //                 $sum: {
        //                     $cond: [{ $eq: ["$status", "pending"] }, 1, 0]
        //                 }
        //             },
        //             overdueTasks: {
        //                 $sum: {
        //                     $cond: [
        //                         {
        //                             $and: [
        //                                 { $lt: ["$dueDate", new Date()] }, // Task is overdue
        //                                 { $ne: ["$status", "completed"] } // Task is not completed
        //                             ]
        //                         },
        //                         1,
        //                         0
        //                     ]
        //                 }
        //             }
        //         }
        //     }
        // ]);

        res.status(200).json(stats);
    } catch (error) {
        res.status(500).send(error.message);
    }
};