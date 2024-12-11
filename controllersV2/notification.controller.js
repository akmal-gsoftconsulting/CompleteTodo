import Notification from "../models/notification.model.js";


export const getNotifications = async (req, res) => {
    try {
        const userId = req.user.userId;
        const notifications = await Notification.find({ userId , isRead: false}, 
            { type: 1, message: 1, isRead: 1, createdAt: 1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const readNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Notification.updateOne({ _id: id }, { isRead: true });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Notification.deleteOne({ _id: id });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};  


export const createNotification = async (req, res) => {
    try {
        const { type, message } = req.body;
        const userId = req.user.userId;
        const notification = new Notification({ userId, type, message });
        const result = await notification.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};