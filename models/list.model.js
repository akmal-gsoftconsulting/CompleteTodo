import mongoose from 'mongoose';

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
    todoTaskIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tasks' 
    }]
});

const List = mongoose.model('List', listSchema);

export default List;
