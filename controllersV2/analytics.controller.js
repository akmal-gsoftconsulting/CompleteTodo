import Tasks from "../models/todoItem.model.js";
import { ObjectId } from "mongodb";



export const getTodoStats = async (req, res) => {
    try {
        const userId = req.user.userId;
        
        const statsByAggregate = await Tasks.aggregate([
            {
                $match: { userId: new ObjectId(userId) }  
            },
            {
                $group: {
                    _id: null, 

                    completedTasks: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "completed"] }, 1, 0]
                        }
                    },
                    inProgressTasks: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "in-progress"] }, 1, 0]
                        }
                    },
                    pendingTasks: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "pending"] }, 1, 0]
                        }
                    },
                    overdueTasks: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $lt: ["$dueDate", new Date()] },
                                        { $ne: ["$status", "completed"] } 
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    }
                }
            }
        ]);

        res.status(200).json(statsByAggregate);
    } catch (error) {
        res.status(500).send(error.message);
    }
};