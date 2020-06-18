const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
    estimated_completion_time: {
        type: Number,
        required: true
    },
    completion_time: {
        type: Number,
        required: false,
        default: null
    },
    status: {
        type: Number,
        required: true,
        default: 1
    }
})

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
    },
    history: {
        type: Map,
        of: historySchema,
        requred: true,
        default: {}
    },
    repeat: {
        type: Map,
        of: String,
        required: true,
        default: {
            days: "",
            weeks: ""
        }
    }
}, {collection: 'tasks'})

mongoose.model('Task', taskSchema)