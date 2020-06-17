const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    point_value: {
        type: Number,
        required: true,
    },
    category_id: {
        type: Number,
        required: true
    },
    estimated_time: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    start_time: {
        type: Number,
        required: true
    },
    estimated_completion_time: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: 3
    },
    completion_time: {
        type: Number,
        requried: true,
        default: null
    },
    image_path: {
        type: String,
        required: true,
        default: "empty"
    },
    assigned_user_id: {
        type: String,
        required: true
    },
    created_user_id: {
        type: String,
        required: true
    }
}, {collection: 'tasks'})

mongoose.model('Task', taskSchema)