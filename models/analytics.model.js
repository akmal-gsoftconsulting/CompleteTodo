import mongoose from 'mongoose';

import Tasks from './todoItem.model.js';

const analyticsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    todoItem: {
        type: Tasks.schema,
        required: true
    },
    Action: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, { timestamps: true });

const Analytics = mongoose.model('Analytics', analyticsSchema);

export default Analytics;