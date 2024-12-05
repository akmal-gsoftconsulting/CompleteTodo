import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
    
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    todoItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'TodoItem', required: true },
    message : { type: String, required: true },
    reminderTime: { type: Date, required: true }, 
    createdAt: { type: Date, default: Date.now },
});

const Reminder = mongoose.model('Reminder', reminderSchema);
export default Reminder;  