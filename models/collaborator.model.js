import mongoose from 'mongoose';
import List from './list.model.js';

const collaboratorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email: {
        type: String,
        required: true
    },
    list: [List.schema]
});

const Collaborator = mongoose.model('Collaborator', collaboratorSchema);

export default Collaborator;