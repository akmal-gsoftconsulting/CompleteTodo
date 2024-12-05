import mongoose from 'mongoose';

import Tasks from './todoItem.model.js';


const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    todoItem: [Tasks.schema]
});

const List = mongoose.model('List', listSchema);

export default List;
