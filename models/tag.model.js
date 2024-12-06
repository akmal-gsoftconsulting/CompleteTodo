import mongoose from 'mongoose';
import Tasks from './todoItem.model.js';

const tagSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name : { type: String, required: true },
    todoItem: [Tasks.schema],
});

const Tag = mongoose.model('Tag', tagSchema);
export default Tag;  