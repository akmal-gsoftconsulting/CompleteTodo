import Reminder from "../models/reminder.model.js";


export const setReminder = async (req, res) => {
    try {
        const { message , reminderTime  , todoItemId} = req.body;
        const userId = req.user.userId;
        const reminder = new Reminder({ userId, todoItemId, message, reminderTime });
        const result = await reminder.save();
        res.status(200).json({status:200 ,  message:"reminder created"  , result:result});
    } catch (error) {
        res.status(500).send(error.message);
    }
}


export const getReminders = async (req, res) => {
    try {
        const userId = req.user.userId;
        const reminders = await Reminder.find({ userId });
        res.status(200).json({status:200 ,  message:"reminders for logged-in user"  , result:reminders});
    } catch (error) {
        res.status(500).send(error.message);
    }
}


export const deleteReminder = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Reminder.deleteOne({ _id: id });
        res.status(200).json({status:200 ,  message:"reminder deleted"  , result:result});
    } catch (error) {
        res.status(500).send(error.message);
    }
}